import { getAuth,clerkClient } from "@clerk/express";
import OpenAI from "openai";
import dotenv from 'dotenv'
import sql from "../configs/db.js";



dotenv.config();

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle=async(req,res)=>{
    try{
        console.log("API AI ROuter");
        const {userId}=req.auth();
        //const {userId}=getAuth();
        const {prompt,length}=req.body;
        const plan=req.plan;
        const free_usage=req.free_usage;

        if(plan!=='premium' && free_usage>=10){
            return res.json({success:false,message:"Limit reached,Upgrade to Continue."})
        }


        const response = await AI.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature:0.7,
        max_tokens:length,
        });

        const content=response.choices[0].message.content

        await sql` insert into creations (user_id,prompt,content,type) 
        values (${userId},${prompt},${content},'article')`;

        if(plan!=='premium'){
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:free_usage + 1
                }
            })
        }

        res.json({
            success:true,content
        })

        console.log("Article generation route hit with:", prompt, length);



    }
    catch(error){
        console.log(error.message)
        if (error.response?.status === 429) {
            return res.status(429).json({ message: "AI quota limit reached for today." });
        }
        res.json({success:false,message:error.message})
    }
}