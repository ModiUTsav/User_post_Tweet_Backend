import mongoose from 'mongoose';
import { type } from 'os';


const postSchema = mongoose.Schema({
    user:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    content: String,
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});


export default mongoose.model('post', postSchema);