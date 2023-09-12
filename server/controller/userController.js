import express from "express";
import adminModel from "../model/adminSchema.js";
import usermodel from "../model/userSchema.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const obj = req.body;
    let user = await adminModel.findOne({ email: obj.email });
    if (user) {
      if (obj.password == user.password) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed", message: "Password does not match" });
      }
    } else {
      res.json({ status: "failed", message: "Email not registered" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/count',async(req,res)=>{
  try {
    const count=await usermodel.find().count() 
    res.json({"count":count})
  } catch (error) {
    console.log(error);
  }
})

router.get('/userDetails',async(req,res)=>{
  try {
    const users=await usermodel.find()
    res.json({"users":users})
  } catch (error) {
    console.log(error);
  }
})

router.get('/userDelete/:id',async(req,res)=>{
  try {
    await usermodel.findByIdAndDelete(req.params.id)
    res.json({"status":"success"})
  } catch (error) {
    console.log(error);
  }
})


export default router;
