const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('pages'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//                                                                                name of data base                                                               
mongoose.connect('mongodb+srv://Tal_server:Talella02@cluster0.vdhxfwd.mongodb.net/sv_burger', () => {
    console.log('db is on');
})

const Users = mongoose.model('user' , new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
}))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/pages/index.html')
})
app.get('/signIn',(req,res) => {
    res.sendFile(__dirname + '/pages/signIn.html')
})
app.get('/menu',(req,res) => {
    res.sendFile(__dirname + '/pages/menu.html')
})
app.get('/pay',(req,res) => {
    res.sendFile(__dirname + '/pages/pay.html')
})

app.post('/register',(req,res) => {

    let temp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password 
    }

    Users.insertMany(temp).then(function () {
        console.log('data inserted');
    }).catch((err) => {console.log(err);})

    res.sendFile(__dirname + '/pages/signIn.html')
})
app.post('/signIn', async (req,res) => {
    const users = await Users.findOne({email:req.body.email, password:req.body.password})
    res.json(users)
})

// {id: 123456789 ,name: 'tal medina' ,password: 'talella02' , money: '999999' ,expenses: [{store: 'replay' , spent: 500} ,{store: 'nike' , spent: 900}]}

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname +'/pages/index.html').then(function () {
//         console.log('home page');
//     }).catch((err) => {console.log(err);})
// })

// const Users = mongoose.model('user' , new mongoose.Schema({
//     id: Number,
//     name: String,
//     password: String,
//     money: String,
//     expenses: [{
//         store: {type: String},
//         spent: {type: Number}
//     }]
// }))

// const check = async () => {
//     Users.insertMany([{id: 123456789 ,name: 'tal medina' ,password: 'talella02' , money: '999999' ,expenses: [{store: 'replay' , spent: 500} ,{store: 'nike' , spent: 900}]}])
// } 
// // check()





app.listen(3000,()=>{
    console.log(`server is runing on 3000`);
});