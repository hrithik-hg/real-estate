import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT= process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/listing', listingRouter);

  
  app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });

  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


