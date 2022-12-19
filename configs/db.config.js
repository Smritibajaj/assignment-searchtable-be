const mongoose = require('mongoose'); 
const { SERVER_PORT, DATABASE, ENV } = require('../configs/app.config');

//Mongoose Debugging for Dev
if(ENV === 'DEVELOPMENT') {
    mongoose.set("debug", true);
}
const getDbUri = () => {
    //return `mongodb+srv://${DATABASE.MONGO.username}:${DATABASE.MONGO.password}@${DATABASE.MONGO.host}/${DATABASE.MONGO.database}?retryWrites=true&w=majority`;
    //return `mongodb://test1:test1234@127.0.0.1:27017/testdb`
    return `mongodb://test1:test1234@127.0.0.1:27017/testdb?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1`
}

const URI = getDbUri();
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
    console.log(getDbUri());
});
// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${JSON.stringify(err)}`);
    process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', (err) => {
    console.log('Mongoose default connection disconnected');
    process.exit(1);
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
module.exports = mongoose;