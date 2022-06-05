module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'auth-jwt-api',
    dialect: 'mysql',
    pool: {
        max: 5, // max - maximum number of connections permissible in a pool
        min: 0, // min – minimum number of connections permissible in a pool
        acquire: 30000, // acquire – maximum time, in terms of milliseconds, that the pool seeks to make the connection before an error message pops up on screen
        idle: 10000 // idle – maximum time, in terms of milliseconds, that a connection can be held idly before being released
    }
}