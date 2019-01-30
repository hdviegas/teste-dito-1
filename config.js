module.exports = {
    name: 'dito1-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb+srv://dito:dito123@hdviegas-bbndz.mongodb.net/test?retryWrites=true',
        name: 'ditodb'
    }
}