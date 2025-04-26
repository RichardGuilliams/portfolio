var crypto = require('crypto'); 
var mongoose = require('mongoose');
var slugify = require('slugify');
var validator = require('validator');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
{   
    name: {
        type: String,
        required: [true, 'A user needs to have a name ']},
    email: {
        type: String,
        required: [true, 'a user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email address']
    },
    photo: {
        type: String,
        default: 'default.jpg'

    },
    role:{
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'a user must have a password'],
        minLength: [8, 'a password must contain at least 8 characters'],
        maxLength: [40, 'a password can be no longer than 40 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'a user must confirm their password'],
        validate: {
            // This only works on SAVE
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password and passworn confirm do not match'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

UserSchema.pre('save', async function(next){
    //Only run if password was modified
    if(!this.isModified('password')) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);

    //Prevent persisting the password confirm in the database
    this.passwordConfirm = undefined;
    next();
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
}

UserSchema.pre(/^find/, function(next){
    //this points to current query
    this.find({active: {$ne: false}});
    next();
})

UserSchema.methods.createPasswordResetToken = function(){
const resetToken = crypto.randomBytes(32).toString('hex');

this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

console.log({resetToken}, this.passwordResetToken);

this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

return resetToken
}

const User = mongoose.model('User', UserSchema);

module.exports = User;