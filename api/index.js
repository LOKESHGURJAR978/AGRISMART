import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import farmRoutes from './routes/info.route.js';
import taskRoutes from './routes/task.route.js';
import chatRoutes from './routes/chat.route.js';
import cropRoutes from './routes/crop.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{ console.log('MongoDB is connected');
}).catch((err)=> {console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Server Started on port 3000');
});


app.use('/api/auth', authRoutes);
app.use('/api/info', farmRoutes); 
app.use('/api/tasks', taskRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/crops', cropRoutes);
  

app.use(express.static(path.join(__dirname, '/client/dist')));


app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'client','dist','index.html'));
}
);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
