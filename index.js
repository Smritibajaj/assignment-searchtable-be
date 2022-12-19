const port = require('./configs/app.config')
//initilize database
require('./configs/db.config');
require('./schemas/index');
const app = require('./server');
app.listen(3003,() => console.log(`service is running 5000`))
module.exports = app;