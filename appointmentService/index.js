const express=require('express');
const app=express();

const dbConnect= require ('./config/db');
dbConnect();


app.use(express.json())
app.use('/appointments/:id/bill/', require('./routes/bill'));
app.use('/appointments/', require('./routes/appointment'));
app.use('/prescription/report/',require('./routes/report'));
app.use('/prescription/',require('./routes/prescription'));

app.get('/', (req,res)=>{
    res.send('API Running');
}
)
const PORT = process.env.PORT || 4500;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
