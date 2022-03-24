const mongoose =require('mongoose');
const db= "mongodb://Nandini:snehan123@cluster0-shard-00-00.pblzj.mongodb.net:27017,cluster0-shard-00-01.pblzj.mongodb.net:27017,cluster0-shard-00-02.pblzj.mongodb.net:27017/devConnector?ssl=true&replicaSet=atlas-xc3evt-shard-0&authSource=admin&retryWrites=true&w=majority";


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