const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const xssPatch = require('./middleware/xssMiddlewarePatch');
const sanitize = require('./middleware/sanitize');
const whitelist = require('./middleware/whitelist')
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const projectRouter = require('./routes/projectRoutes');

const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60* 1000,
    message: 'You have exceeded the amount of requests allowed, please try again in one hour' 
})




module.exports = {
    express, 
    morgan,
    rateLimit,
    helmet,
    xssPatch,
    sanitize,
    whitelist,
    cookieParser,
    compression,
    cors,
    AppError,
    globalErrorHandler,
    userRouter,
    postRouter,
    projectRouter,
    limiter
}