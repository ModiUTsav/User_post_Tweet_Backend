import mongoose from 'mongoose';
import { type } from 'os';

mongoose.connect('mongodb://127.0.0.1:27017/miniproject');

const userSchema = mongoose.Schema(


    {
        userName: String,
        name: String,
        age:Number,
        email:String,
        password: String,
        Posts:[{
            type:mongoose.Schema.Types.ObjectId, ref:'post' 

        }]
    }


)


export default mongoose.model('user', userSchema);