const userContainer= require("./container/userContenedor"); 

const userService = new userContainer();


const environment= async()=>{

    let users = await userService.getAll();
    

    let user={
        name: 'juan',
        age: 18,
        country: 'peru'
    }

    await userService.save(user)
    

    let id= 2
    
    // let userById =await userService.getById(id)

    // let deleteId= await userService.deleteById(id);

    // let deleteAll= await userService.deleteAll(); 
}


environment();