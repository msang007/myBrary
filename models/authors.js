import mongoose from 'mongoose';
//import dotenv from "dotenv";
//const ENV = dotenv.config().parsed;
//mongoose.connect(ENV.DATABASE_URL,{useNewUrlParser: true })
//const db= mongoose.connection
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
//const author = db.model('Author', authorSchema);

//export default {author};

export default mongoose.model('Author', authorSchema);