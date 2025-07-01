import cookieParser from 'cookie-parser';
import express from 'express';
import userModel from './Model/user.js'
import postModel from './Model/post.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { send } from 'process';

const app = express();
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(express.json());


app.get("/", (req, res)=>{

    res.render('index');
});

app.get("/login", (req, res)=>{

    res.render('login');
});



app.post("/register",async (req,res)=>{
   let {name,username,email,password,age} = req.body;

   const user = await userModel.findOne({email})
   if(user){
  return  res.status(500).send("user already exist");
   }

   bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt, async (err,hash)=>{
      let user =   await userModel.create({
            username,
            name,
            age,
            email,
            password:hash

        })

       let token =  jwt.sign({email:email,userid:user._id},"shhh")
        res.cookie("token",token)
        res.send("registerd")




    })
   })

})

app.post("/login",async (req,res)=>{
   let {email,password} = req.body;

   const user = await userModel.findOne({email})
   if(!user){
  return  res.status(401).send("something went wrong");
   }


   bcrypt.compare(password,user.password,function(err,result){
    if(result){ 

        let token =  jwt.sign({email:email,userid:user._id},"shhh")
        res.cookie("token",token)
        
        res.status(200).redirect("/profile")
    }
    else res.redirect("/login");    

   });

   app.get("/logout",(req,res)=>{

    res.clearCookie("token" , "")
    res.redirect("/login")
   })

});


app.get("/profile",isLoggedIn,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate('Posts')
    console.log(user);
    res.render("profile",{user:user});
});

app.get("/likes/:id",isLoggedIn,async(req,res)=>{

    let  post = await postModel.findOne({_id:req.params.id}).populate('user');
    

    if(post.likes.indexOf(req.user.userid) === -1){

        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
    


    await post.save();
    res.redirect("/profile")

});

app.post("/post",isLoggedIn,async(req,res)=>{
    let {content } = req.body;
    

    let user = await userModel.findOne({email:req.user.email})
    let post = await postModel.create({
        user:user._id,
        content
    })
    user.Posts.push(post._id);
    await user.save();
    res.redirect("/profile")


});

function isLoggedIn(req,res,next){
    if(req.cookies.token===""){
        return res.redirect("/login")
       
}
else{
    let data = jwt.verify(req.cookies.token,"shhh");
    req.user = data;
    next();
}
     
 }

app.listen(3000,()=>{

    console.log("server is running on port 3000");
});