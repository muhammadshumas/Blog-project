const fs=require('fs')
const {v4:uuidv4}=require('uuid')
const express = require('express');
const Router = express.Router();

//Posts Array
let posts=[]

// Router.get('/',(req,res,next)=>{
//   res.send({
//     name:'shumas'
//   })
// })

Router.post('/createpost',(req,res,next)=>{
  fs.readFile('posts.json',(err,data)=>{
    if(!err){
      posts=JSON.parse(data);
    }
    req.body.id=uuidv4()
    posts.push(req.body)
    fs.writeFile('posts.json',JSON.stringify(posts),(err)=>{
    res.send({message:'Post Added'})
    })
  })

})

module.exports=Router