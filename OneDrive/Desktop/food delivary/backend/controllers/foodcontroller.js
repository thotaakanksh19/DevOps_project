import foodModel from "../models/foodmodel.js";

import fs from "fs";

//add food item
const addfood=async(req,res)=>{
    const allowedCategories = ["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"];
    const category = String(req.body.category || '').trim();
    if (!allowedCategories.includes(category)) {
        return res.status(400).json({success:false,message:"Invalid category"});
    }
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
//remove  food item
const removeFood=async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, (err) => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export {addfood,listFood,removeFood}