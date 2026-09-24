import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo db is connected')
    } catch (err) {
        console.log("mongo db connection failed", err.message);
        process.exit(1);
    }
}
export default connectDB;

//process.exit() //immediately stops the node js process. and pending asynchroonous tasks like unfinished log writes would be shutdown immediately.
//if this wasn't written then, even though we get the log error, app would keep running without the mongo db connection
//then every db query would siletly fails.
//exit(0) ===> exited successfully
//exit(1) ==> exited due to errors

//This matters lots in development,if we are using process manager like PM@, DOCKER, kubernetes,
//they watch for non zero exit codes and when found it automatically restart the app.