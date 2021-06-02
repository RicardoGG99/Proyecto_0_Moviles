import express from 'express';
import router from './routes/index'
const app = express();
const PORT = process.env.PORT || 4000;

//middles
app.use(express.json()) //Transforma lo que llegue a un objeto json
app.use(express.urlencoded({extended: false})) //Transforma un form a json

app.use(router)

app.listen(PORT, () =>{
    console.log(`Server en puerto ${PORT}`);
})