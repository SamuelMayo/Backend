import express from 'express'
import productsContainer from './container/productsContainer.js';

const app=express()
const server = app.listen(8080, ()=>console.log(`listen on port 8080`));

const products= new productsContainer();

app.get('/products',(req,res)=>{
    const search=async()=>{
        let result= await products.getAll()
        
        res.send(result)
    }
    search()
})


app.get('/productsRandom',(req,res)=>{
    
    const search=async()=>{

        let id=parseInt(Math.random()*10+1)

        console.log(id);

        let result= await products.getById(id)
        
        res.send(result)
    }
    search()
})

    

