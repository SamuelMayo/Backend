import { Router } from "express";
import productsContainer from '../container/productsContainer.js';


const router = Router();

const products= new productsContainer();

router.get('/',async (req,res)=>{
    
    let result= await products.getAll()
    return res.send(result)
})


router.get('/:id', async(req,res)=>{
    let allProducts=  await products.getAll()
    if(req.query.id>allProducts.length){
        return res.send('404 ID no encontrado o inexcistente')
    }
    let id= req.query.id;
    let result= await products.getById(id)
    res.send(result)
})

router.post('/', async(req,res)=>{

    let product=req.body;
    await products.save(product)
    res.send({status: 'success', message:'product-added'})
})

router.put('/', async(req,res)=>{
    let producto = req.body
    await products.toUpdate(producto)
    res.send('Producto Actualizado con exito ')
})

router.delete('/', async(req,res)=>{
    let id = req.body
    await products.deleteById(id.delete)
    res.send('Prodcuto eliminado exitosamente')
})

export default router