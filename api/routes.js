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
    req.body.id=uuidv4()
    posts.push(req.body)
    fs.writeFile('posts.json',JSON.stringify(posts),(err)=>{
    res.send({message:'Post Added'})
    })
  })

})

Router.post('/deletepost/:id',(req,res,next)=>{
  fs.readFile('posts.json',(err,data)=>{
    if(!err){
      posts=JSON.parse(data)
    }
    //&& post.parentId!==req.parentId
    posts=posts.filter((post)=>{
      return post.id!==req.params.id;
    })
    fs.writeFile('posts.json',JSON.stringify(posts),(err)=>{
      res.send({message:'Post Deleted'})
    })
  })
})

Router.post('/editpost/:id',(req,res,next)=>{
  fs.readFile('posts.json',(err,data)=>{
    if(!err){
      posts=JSON.parse(data)
    }

    // && post.parentId===req.body.parentId
    let updatedPostIndex=posts.findIndex(post=>{
      return post.id===req.params.id
    })
    posts[updatedPostIndex]=req.body;
    posts.forEach(post=>{
      if(post.parentId!==null && post.parentId===posts[updatedPostIndex].id){
        post.parent=posts[updatedPostIndex].title
      }      
    })
    fs.writeFile('posts.json',JSON.stringify(posts),(err)=>{
      res.send({message:'Post Deleted'})
    })
  })
})

module.exports=Router