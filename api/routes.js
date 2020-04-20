const fs=require('fs')
const {v4:uuidv4}=require('uuid')
const express = require('express');
const Router = express.Router();

//Posts Array
let posts=[]

Router.get('/getposts',(req,res,next)=>{
  fs.readFile('posts.json',(err,data)=>{
    if(err){
      return res.status(404).send({message:'Posts not found'})
    }
    posts=JSON.parse(data);
    res.send(posts)
  })
})

Router.post('/createpost',(req,res,next)=>{
  fs.readFile('posts.json',(err,data)=>{
    if(!err){
      posts=JSON.parse(data);
    }
    if(!req.body.id){
      req.body.id=uuidv4()
    }
    
    posts.push(req.body)
    fs.writeFile('posts.json',JSON.stringify(posts),(err)=>{
    res.send({message:'Post Added'})
    })
  })

})

module.exports=Router