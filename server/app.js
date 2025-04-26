const express = require("express");
const packages = require('./appPackages');
const app = packages.express();
const path = require('path');


// app.enable('trust proxy')

const static = express.static(path.join(__dirname, '/public'));
app.use('/thumbnails', express.static(path.join(__dirname, 'public/thumbnails')));


//Global Middleware
// Implementing cors
console.log("Mounting Cors");
app.use(packages.cors());

console.log("Allowing Cors to use preflight requests for all routes");
app.options('/:any', packages.cors());
// app.options('/api/v1/tours/:id', cors());
// Access-Control-Allow-Origin *

console.log("Adding public path to __dirname");
// app.use(packages.express.static(packages.path.join(__dirname, '/public')));
app.use(static);

// Data Security
console.log("Mounting Helmet");
app.use(packages.helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
//         baseUri: ["'self'"],
//         fontSrc: ["'self'", 'https:','http:', 'data:'],
//         scriptSrc: [
//           "'self'",
//           'https:',
//           'http:',
//           'blob:'],
//         styleSrc: ["'self'", 'https:', 'http:','unsafe-inline']
//       }
//     })
//   );

//   app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Error Handling
if(process.env.NODE_ENV === 'development') {
    app.use(packages.morgan('dev'));
}

//Rate Limiting
console.log('Implimenting rate limiter')
app.use('/api', packages.limiter);

// app.post('/webhook-checkout',
//     bodyParser.raw({ type: 'application/json'}),
//     bookingController.webhookCheckout);

//Body parser, reading data from body into req.body
app.use(packages.express.json({ limit: '10kb' }));
app.use(packages.express.urlencoded({
        extended: true,
    limit: '10kb'
}))
app.use(packages.cookieParser());


//Data Sanitization against nosql query injection
app.use(packages.xssPatch);
app.use(packages.sanitize);
//Data sanitization against cross site scripting attacks CXX

//Protect against http parameter pollution
console.log('Creating whiteList')
app.use(packages.whitelist)

app.use(packages.compression());

//Serving static files

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//Routes 
console.log('Mounting UserRoutes...');
app.use('/api/v1/users', packages.userRouter);

console.log('Mounting PostRoutes...');
app.use('/api/v1/posts', packages.postRouter);

console.log('Mounting ProjectRoutes...');
app.use('/api/v1/projects', packages.projectRouter);

console.log('Adding all paths to app')
app.all('wildcard', (req, res, next) => {
    next(new packagess.AppError(`cant find ${req.originalUrl} on this server`, 404));
});

console.log('mounting the global error handler')
app.use(packages.globalErrorHandler);

module.exports = app;