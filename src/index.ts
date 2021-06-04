import express from 'express';
import router from './routes/index'
import cors from 'cors'
import path from 'path'
const multer = require('multer') 
const app = express();
const PORT = process.env.PORT || 4000;

//middles
app.use(express.json()) //Transforma lo que llegue a un objeto json
app.use(express.urlencoded({extended: false})) //Transforma un form a json
app.use(router)
app.use(cors())

//sets
app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'ejs')

app.use(multer({
    dest: path.join(__dirname, '../src/public/imagenes')
}).single('image'))

router.get('/', async (req, res) => {
    res.render('index')
})

router.post('/upload', async (req, res) => {
    await console.log(req.file)
    res.send('uploaded')
})



app.listen(PORT, () =>{
    console.log(`Server en puerto ${PORT}`);
})