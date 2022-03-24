const express = require('express');
const cors = require('cors');
const app=express();

const dbConnect= require ('./config/db');
dbConnect();

app.use(cors())
app.use(express.json())
app.use('/patient', require('./routes/patient'));
app.get('/', (req,res)=>{
    res.send('API Running');
}
)
const PORT= process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
