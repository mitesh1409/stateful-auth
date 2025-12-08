import mongoose from "mongoose";

function connectDB() {
    try {
        mongoose.connect(
            process.env.MONGO_DB_URI || 'mongodb://localhost:27017/stateful-auth-example'
        );
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}

// Connection event listeners:
// connected, disconnected, error
mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
mongoose.connection.on('error', error => {
    logError(error);
    process.exit(1);
});

function logError(error) {
    console.error('DB Connection Error: ', error.message || error);
}

export default connectDB;
