const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'gaurav',
    password : '',
    database : 'gaurav',
    port: 6666
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

// app.get('/', (req, res)=> { console.log(db); return res.send(db.users); })
app.get('/', (req, res)=> res.send("IT's working??"))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { console.log(db.users); return register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
