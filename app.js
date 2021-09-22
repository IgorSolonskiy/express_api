import {config} from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './Routes/users.js';

config();

const app = express();

app.use(express.json())
app.use('/api',usersRoutes);

(async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(process.env.API_PORT, () => console.log(`Server running on port: http://localhost:${process.env.API_PORT}`));

    } catch (e) {
        console.log(e)
    }
})();
