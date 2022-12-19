const { PORT, ENV, DB_HOST, DB_USER, DB_PASSWORD, DB } = process.env;
module.exports = {
    SERVER_PORT: process.env.PORT || 3003,
    ENV,
    DATABASE: {
        MONGO: {
            host: DB_HOST,
            username: DB_USER,
            password: DB_PASSWORD,
            database: DB
        }
    },
    JWT_SECRET: '$&&__DATAAPP__&&$%@#$@&!@#'
}