const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../../models/userModel');
const Post = require('./../../models/postModel');

dotenv.config({ path: `./config.env`});

const DB = process.env.DATABASE.replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD );

mongoose
.connect(DB)
.then(() => console.log(`DB connection successful`));

// Read json data
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));

const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false});
        await Post.create(posts, { validateBeforeSave: false});
        console.log('Data successfully loaded');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};

// Delete all data from database
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Post.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

if(process.argv[2] === '--import') importData();
if(process.argv[2] === '--delete') deleteData();

console.log(process.argv);