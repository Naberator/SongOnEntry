module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });

    database.on('error', error => console.log('Database: Connection failed: ${error}'));
    database.on('connected', () => console.log('Database: Connected'));
    database.on('disconnected', () => console.log('Database: Disconnected'));

    process.on('SIGINT', () => {
        database.close(() => {
            console.log('Database: App terminated. Connectin closed');
            process.exit(0);
        });
    });
};

