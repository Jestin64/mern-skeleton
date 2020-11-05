const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key', 
    // mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
    //     'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    //     (process.env.MONGO_PORT || '27017') + 
    //     '/mernproject'
    mongoUri: 'mongodb+srv://AaronBaron:AaronBaron@cluster0.syfka.gcp.mongodb.net/mernproject?retryWrites=true&w=majority'
}

export default config