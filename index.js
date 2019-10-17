import express from 'express';

let app = express();

app.get('/',(req,res) => {
    res.send('hello world!')
})

app.listen(8898,() => console.log('Running on localhost:8898'));