const mongoose =require('mongoose');
const db= "mongodb://Nandini:snehan123@cluster0-shard-00-00.zcjhr.mongodb.net:27017,cluster0-shard-00-01.zcjhr.mongodb.net:27017,cluster0-shard-00-02.zcjhr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-2psiw4-shard-0&authSource=admin&retryWrites=true&w=majority";


const connectDB = ()=>{
    try{
        mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          }).then(()=>{
            console.log('Database connected');
        });
    }
    catch(err){
        console.log(err.message);

    }
}
module.exports = connectDB;