import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";
import Baristas from "../models/baristas.js"

export const router = express.Router();

router.post("/register", async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {email,password,name,phone,type} = req.body;

        if(type=="Customer") {
            const customer = new Customer({email,password,name,phone});
            await customer.save(session);
        } else if(type=="Staff") {
            const barista = new Baristas({email,password,name,phone});
            await barista.save(session);
        }

        await session.commitTransaction();

         res.status(201).json({message: `${type} account created successfully`});
    } catch(err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
});


// router.post("/login", async(req,res) => {

// });