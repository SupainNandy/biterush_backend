import express from 'express'
import env from 'dotenv'
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js';
import morgan from 'morgan';
env.config();
const app = express()
const port=process.env.PORT || 8000
app.use(morgan("dev"))
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));


//Router
//1->Auth Router
app.use('/api/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('Hello from express server');
})



app.listen(port,()=>{
    connectDB()
    console.log(`Express server start at port 'http://localhost:${port}'`)
})