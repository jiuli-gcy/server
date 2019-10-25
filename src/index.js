import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser'

import users from './routes/users';

let app = express();

app.use(bodyParser.json());

app.use('/api/users',users);

app.get('/',(req,res) => {
    res.send('hello')
})

//监听8898端口
app.listen(8898,() => console.log('Running on localhost:8898'));