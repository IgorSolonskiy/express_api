import {config} from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users.js';

config();

const app = express();

app.use(usersRoutes);

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
