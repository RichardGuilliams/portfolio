module.exports = (req, res, next) => {
    try {
      const queryClone = {};
      for (const key in req.query) {
        queryClone[key] = req.query[key];
      }
      req.query = queryClone;
    } catch (e) {
      console.warn('Could not clone req.query:', e);
    }
    next();
  };