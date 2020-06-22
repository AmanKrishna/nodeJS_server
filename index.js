const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// here dishes is an endpoint
app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    // next(): Look for additional specification down whihc 
    // will match this endpoint
    next();
});

// if get verb was called at the dishes endpoint
app.get('/dishes',(req,res)=>{
    res.end('Will send all the dishes to you');
});

app.post('/dishes',(req,res)=>{
    // post req will carry some data in JSON form
    // using app.use(bodyParser.json())
    // will extract this info as json and apllied to the body of the req
    res.end('Will add the dish: '+req.body.name+
        ' with details '+req.body.description);
});

app.put('/dishes',(req,res)=>{
    res.statusCode=403;
    res.end("Put operation not supported on dishes");
});

app.delete('/dishes',(req,res)=>{
    res.end("Deleting all the dishes");
});

// if get verb was called at the dishes endpoint
// the /:dishId and req.params.dishId must be same
app.get('/dishes/:dishId',(req,res)=>{
    res.end('Will send detail of the dish'+req.params.dishId+" to you");
});

app.post('/dishes/:dishId',(req,res)=>{
    // post req will carry some data in JSON form
    // using app.use(bodyParser.json())
    // will extract this info as json and apllied to the body of the req
    res.statusCode=403;
    res.end("Put operation not supported on /dishes/"+
        req.params.dishId);
});

app.put('/dishes/:dishId',(req,res)=>{
    // add a line to the reply message
    res.write('Updating the dish: '+req.params.dishId+'\n');
    res.end("ill update the dish: "+req.body.name+
        ' with details '+req.body.description);
});

app.delete('/dishes/:dishId',(req,res)=>{
    res.end("Deleting the dish "+req.params.dishId);
});
// i am telling informing express that static files can be found 
// herer. __dirname==pwd 
// this allows me to avoid all the if else and checking if its
// GET request etc etc that I did in the node_server before
app.use(express.static(__dirname+'/public'))

// next will allow me to use additional middlewares
app.use((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express Server!</h1></body></html>');

});

const server = http.createServer(app);
server.listen(port,hostname,() =>{
    console.log(`Server is running at http://${hostname}:${port}`);
})