import fs from 'fs'

const path= './files/products.json'

class productsContainer{
    save =async(product)=>{
        try{
            let products = await this.getAll();
            if(products.length===0){
                product.id=1;
                products.push(product);
                await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            }else{
                product.id= products[products.length-1].id+1;
                products.push(product);
                await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
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
            if(typeof findproduct=== 'object' ){
                return findproduct
                
            }else{
                return console.log('No existe un productoio con ese id')
            }
        }catch(err){
            console.log(`No se pudo encontrar al productoio ${err}`);
        }
    }

    getAll= async()=>{
        try{
            if(fs.existsSync(path)){
                let fileData= await fs.promises.readFile(path,'utf-8')
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
                const newArray = fs.promises.writeFile(path, JSON.stringify(eliminate, null, '\t'))
                console.log("deletByID: productoio Eliminado correctamente");
                return newArray
        }catch(err){
            console.log(`No se puedo eliminar: , ${err}`)
        }
    }   

    deleteAll= async()=>{
        try{
            await fs.promises.writeFile(path, [])
        }catch(err){
            console.log(`Error al eliminar los archivos ${err}`);
        }
    }

    toUpdate = async(product) =>{
        let arr = await this.getAll()
        let id = product.id;
        let titulo = product.title;
        let price = product.prices;
        let thumbnail = product.thumbnail;
        arr.map(function(dato){
            if(dato.id == id){
                dato.title = titulo;
                dato.prices = price;
                dato.thumbnail = thumbnail;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        return arr;
    }
}

// module.exports = productsContainer;

export default productsContainer;