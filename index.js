const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter')
const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.delete('/dishes/:dishId',(req,res)=>{
    res.end("Deleting the dish "+req.params.dishId);
});
// i am telling informing express that static files can be found 
// herer. __dirname==pwd 
// this allows me to avoid all the if else and checking if its
// GET request etc etc that I did in the node_server before
app.use(express.static(__dirname+'/public'))
// add the dishRouter router
app.use('/dishes',dishRouter);
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