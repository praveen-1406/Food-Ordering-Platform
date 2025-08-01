import { Request, RequestHandler, Response } from "express";
import User from "../models/user";


export const getCurrentUser=async(req:Request,res:Response)=>{
    try {
        const currentUser=await User.findById(req.userId);

        if(!currentUser){
            res.status(404).json({message:"User not found"});
            return;
        }

        res.json(currentUser);
        return;

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong!"})
        return;
    }
}

export const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id })

        if (existingUser) {
            return res.status(200).send("user already exists")
        }
        const newUser = new User(req.body)
        await newUser.save();
        res.status(201).json(newUser.toObject());

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating user" })
    }
}

export const updateCurrentUser = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.send(user);
        return;

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating user" })
        return;
    }
}



export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
}