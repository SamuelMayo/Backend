import express from 'express'
import productsRouter from './routes/products.router.js';
import __dirname from './utils.js';

const app=express()
const server = app.listen(8080, ()=>console.log(`listen on port 8080`));


app.use(express.json())
app.use('/api/products', productsRouter);

app.use(express.static(__dirname+'/public'))


