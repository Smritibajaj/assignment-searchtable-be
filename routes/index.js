
const V1Router = require('./v1.route');

module.exports = (app) => {
    app.use('/api/v1', V1Router);
}