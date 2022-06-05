const testingMiddleware = (req, res, next) => {

    console.log('-------TestingMiddleware--------');

    next();
};

module.exports = testingMiddleware;