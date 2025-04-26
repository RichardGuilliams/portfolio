const xss = require('xss');  // Importing xss-clean or another sanitization library

// Middleware function to sanitize the query, body, and params
const sanitizeInput = (req, res, next) => {
    // Sanitize query parameters
    if (req.query) {
        Object.keys(req.query).forEach((key) => {
            req.query[key] = xss(req.query[key]);
        });
    }

    // Sanitize request body (for POST, PUT, etc.)
    if (req.body) {
                Object.keys(req.body).forEach((key) => {
                    if(key != "blocks") req.body[key] = xss(req.body[key]);
                    else{
                        req.body.blocks.forEach((block, i) => {
                            Object.keys(block).forEach(blockKey => {
                                req.body.blocks[i][blockKey] = xss(req.body.blocks[i][blockKey])
                            })
                        })
                    }
                });
    }

    // Sanitize route params (optional, depending on your use case)
    if (req.params) {
        Object.keys(req.params).forEach((key) => {
            req.params[key] = xss(req.params[key]);
        });
    }

    next();  // Continue to the next middleware or route handler
};

module.exports = sanitizeInput;