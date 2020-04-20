
const express = require('express');
const app = express();
const cors=require('cors')

routes=require('./routes')

const PORT = 3000;
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('',routes)

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});