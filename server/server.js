import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';

dotenv.config();
const app=express();
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


const legacyRequireAuth = (req, res, next) => {
  const {userId}=req.auth();
  if (!userId) {
    return next(new Error('Unauthenticated'))
  }
  next()
}

app.get('/',(req,res)=>res.send('Server is Live!!'))

// app.use(requireAuth(),(req, res, next) => {
//   console.log("✅ Authenticated user:", req.auth?.userId);
//   next();
// })
// after this if any route created that will be protected
//that means without sign no user can access
// console.log("Hi")

// app.use(clerkMiddleware())
//app.use(requireAuth())

app.use('/api/ai',legacyRequireAuth,aiRouter)

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})