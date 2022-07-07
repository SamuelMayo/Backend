const fs = require('fs')

const path='./src/files/users.json'

class userContainer{
    save =async(user)=>{
        try{
            let users = await this.getAll();
            if(users.length==0){
                user.id=1;
                users.push(user);
                await fs.promises.writeFile(path, JSON.stringify(users, null, '\t'))
            }else{
                user.id= users[users.length-1].id+1;
                users.push(user);
                await fs.promises.writeFile(path, JSON.stringify(users, null, '\t'))
            }
            console.log(users);
        }catch(err){
            console.log(`No se pudo escribir el archivo ${err}`);
        }    
        
    }

    getById = async(id)=>{
        try{
            let users = await this.getAll();
            const findUser = users.find((user)=>{
                return user.id===id
            })
            if(typeof findUser=== 'object' ){
                return findUser
                
            }else{
                return console.log('No existe un usuario con ese id')
            }
        }catch(err){
            console.log(`No se pudo encontrar al usuario ${err}`);
        }
    }

    getAll= async()=>{
        try{
            if(fs.existsSync(path)){
                let fileData= await fs.promises.readFile(path,'utf-8')
                let users= JSON.parse(fileData);
                return users;
            }else{
                return [];
            }
        }catch(err){
            console.log(`No se pudo leer el archivo ${err}`);
        }
    }

    deleteById=async(id)=>{
        try{
            let users = await this.getAll();
            const eliminate = users.filter((user) =>{
                if(id != user.id){
                    return user
                }else{
                    return null
                }
            })
                const newArray = fs.promises.writeFile(path, JSON.stringify(eliminate, null, '\t'))
                console.log("deletByID: Usuario Eliminado correctamente");
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
}

module.exports = userContainer;