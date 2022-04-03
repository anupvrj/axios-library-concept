const express =require('express');
const twig =require('twig');
const app =express();

const path = require('path');

app.get("/",(req,res)=>{
    res.render('index.twig',{heading:"AXIOS HTTP CLIENT REQUEST WITH NODEJS"})
})

// set view engine 
app.set('view engine', 'twig');
// app.set("views",path.resolve(__dirname,"views/liquid"));

//load the assets
app.use('/css', express.static(path.resolve(__dirname, "public/css")));
// app.use('/img', express.static(path.resolve(__dirname, "public/assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "public/js")));

app.listen(3030, ()=>console.log("server is running"));