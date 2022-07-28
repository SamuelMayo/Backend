import fs from 'fs'

const path1= './src/files/products.json'


class productsContainer{
    save =async(product)=>{
        try{
            let products = await this.getAll();
            if(products.length===0){
                product.id=1;
                products.push(product);
                await fs.promises.writeFile(path1, JSON.stringify(products, null, '\t'))
            }else{
                product.id= products[products.length-1].id+1;
                products.push(product);
                await fs.promises.writeFile(path1, JSON.stringify(products, null, '\t'))
            }
            console.log(products);
        }catch(err){
            console.log(`No se pudo escribir el archivo ${err}`);
        }    
        
    }

    getById = async(id)=>{
        try{
            let products = await this.getAll();
            const findproduct = products.find(product=> product.id==id)
            console.log(findproduct);
            if(findproduct){
                return findproduct
            }else{
                return {error:'No existe un productoio con ese id'}
            }
        }catch(err){
            console.log(`No se pudo encontrar al productoio ${err}`);
        }
    }

    getAll= async()=>{
        try{
            if(fs.existsSync(path1)){
                let fileData= await fs.promises.readFile(path1,'utf-8')
                let products= JSON.parse(fileData);
                return products;
            }else{
                return [];
            }
        }catch(err){
            console.log(`No se pudo leer el archivo ${err}`);
        }
    }

    deleteById=async(id)=>{
        try{
            let products = await this.getAll();
            const eliminate = products.filter((product) =>{
                if(id != product.id){
                    return product
                }else{
                    return null
                }
            })
                const newArray = fs.promises.writeFile(path1, JSON.stringify(eliminate, null, '\t'))
                console.log("deletByID: productoio Eliminado correctamente");
                return newArray
        }catch(err){
            console.log(`No se puedo eliminar: , ${err}`)
        }
    }   

    deleteAll= async()=>{
        try{
            await fs.promises.writeFile(path1, [])
        }catch(err){
            console.log(`Error al eliminar los archivos ${err}`);
        }
    }

    toUpdate = async(product) =>{
        let arr = await this.getAll()
        let id = product.id;
        let producto = product.product;
        let modelo= product.model;
        arr.for(function(dato){
            if(dato.id == id){
                dato.product = producto;
                dato.model = modelo;
                
            }
        })
        await fs.promises.writeFile(path1,JSON.stringify(arr,null,'\t'));
        return arr;
    }
}

// module.exports = productsContainer;

export default productsContainer;