import express from 'express';
import fs from 'fs';
import https from 'http';
import cors from 'cors';
import helmet from 'helmet';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';
import bycrypt from 'bcrypt';

env.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());
app.use(helmet());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'shake'
});
db?console.log("Connected"):console.log("No connection");


app.post('/api/register',async(req,res)=>{

    let isExisted = false;
    const {email,password} = req.body;
    const sql = "INSERT INTO credentials (username,password)VALUES(?,?)";
    const Existed = "SELECT * FROM credentials";  

    try{
        const hashedPassword = await bycrypt.hash(password,10);
   db.query(Existed,(err,result)=>{
     result.forEach(prod =>{
        if(prod.username.includes(email) || prod.password.includes(hashedPassword)){
            isExisted = true;
        }
    });

    if(isExisted){
        res.json({message:"Data is Existed!!!!"});
    }else{
        db.query(sql,[email,hashedPassword],(err,results)=>{
            err? res.json("Have Problem"):res.json({message:"Success"})
         });
    }
   });

    }catch(error){
        console.log(error);
    }
});


// THIS is a login
 app.post('/api/login',async(req,res)=>{
    const {email,password} = req.body;
    const sql = 'SELECT * FROM credentials';
    try{

 db.query(sql,async(err,result)=>{
 
 let credentials = false;
 //Kanina i use find pero mas efficient raw tong for
 //e2 sabi  "issue lies in the way you are using the find method inside the db.query callback. The find method is not designed to handle asynchronous operations like bcrypt.compare"
 for (let pro of result){
    if(pro.username === email && await bycrypt.compare(password,pro.password)){
      credentials = !credentials;
    }
 }

 if(credentials){
    const token = jwt.sign({username:email},process.env.ACESS);
 return res.json({message:"Exist", username:email,token:token})

 }
 return   res.json({message:"Dont Exist"})
 
})

    }catch(error){
        console.log(error)
    }

 });


try{
     const server = https.createServer({
          key:fs.readFileSync('key.pem'),
          cert:fs.readFileSync('cert.pem')
          },app);
          server.listen(PORT,()=>console.log(`PORTS ARE WORKING ${PORT}`))

}catch(error){
     console.error('Failed to start HTTPS server:', error);
     // Fallback to HTTP server
     app.listen(PORT, () => console.log(`HTTP server is running on port ${PORT}`));
}


