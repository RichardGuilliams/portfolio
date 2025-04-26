const mongoSanitize = require('express-mongo-sanitize');

const sanitizeKey = (key) => key.replace(/[\$\.\*]/g, ''); // strip bad chars from keys

const sanitizeInput = (input, parentKey = '') => {
  if (Array.isArray(input)) {
    return input.map(item => sanitizeInput(item));
  }

  if (typeof input === 'object' && input !== null) {
    const sanitizedObject = {};
    Object.entries(input).forEach(([key, value]) => {
      const cleanKey = sanitizeKey(key);
      sanitizedObject[cleanKey] = sanitizeInput(value, cleanKey);
    });
    return sanitizedObject;
  }

  // For primitive values
  return sanitizeValue(parentKey, input);
};

const sanitizeValue = (key, value) => {
  if (typeof value !== 'string') return value;

  // Only sanitize values of unknown fields
  const safeFields = ['email', 'username', 'password', 'title', 'content'];
  if (safeFields.includes(key)) return value;

  return value.replace(/[\$\*]/g, '');
};


module.exports = (req, res, next) => {
  // Sanitize the body without re-parsing it
  // if (req.body) {
  //   // Directly sanitize the request body without JSON serialization
  //   Object.keys(req.body).forEach(key => {
  //     if (typeof req.body[key] === 'string') {
  //       console.log(req.body)
  //       console.log(req.body[key])
  //       req.body[key] = mongoSanitize(req.body[key]); // Sanitize only string fields
  //     }
  //   });
  // }

  // // Sanitize req.query (safe read-only)
  // const cleanQuery = {};
  // for (const key in req.query) {
  //   if (Object.hasOwnProperty.call(req.query, key)) {
  //     cleanQuery[key] = mongoSanitize(req.query[key]);
  //   }
  // }
  // req._sanitizedQuery = cleanQuery; // attach sanitized copy

  // // Sanitize req.params
  // if (req.params) {
  //   for (const key in req.params) {
  //     req.params[key] = mongoSanitize(req.params[key]);
  //   }
  // }
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }

  // Sanitize req.query if it exists
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }

  // Sanitize req.params if it exists
  if (req.params) {
    req.params = sanitizeInput(req.params);
  }

  next();
};
