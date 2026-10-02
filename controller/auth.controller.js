import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import genToken from "../util/token.js";
import user from "../models/user.model.js";
export const signUp = async(req, res)=>{
    try{
        const {fullName,email,password,mobile,role}=req.body
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password is mustbe 6 charecters"})
        }

        if(mobile && mobile.length<10){
            return res.status(400).json({message:"Mobile number should be 10 digit"})
        }

        const hassPass = await bcrypt.hash(password,10)

        const user = await User.create({
            fullName,
            email,
            role,
            password:hassPass,
            mobile
        })
        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json({message:"User created successfuly...",user})

    }catch(err){
        console.log('SignUp error: ',err)
        return res.status(500).json({message:`SigUp error: ${err}`});
    }
}


export const signIn = async(req, res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Wrong Password"})
        }
        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })


        return res.status(200).json({message:"User signin successfuly...",user})

    }catch(err){
        console.log('SignIn error: ',err);
        return res.status(500).json({message:`SigIn error: ${err}`});
    }
}

export const signOut = async(req, res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:'Logout Successfuly...'})

    }catch(err){
        console.log('Signout error: ',err)
        return res.status(500).json({message:`Signout error: ${err}`})
    }
}


export const sendOtp=async(req,res)=>{
    try{
        const email = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOtp = randomOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        user.isOtpVerified = false;
        await user.save();

        await sendOtpMail(user.email,randomOtp);



        return res.status(200).json({message:"OTP sent successfully"})
        

    }catch(err){
        console.log("Send OTP Error: ",err)
        return res.status(500).json({message:`Send OTP error: ${err}`})
    }
}

export const verifyOtp = async(req, res)=>{
    try{       
        const {email, otp} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if(user.otpExpiry<Date.now()){
            return res.status(400).json({message:"OTP has expired"})
        }
        if(user.resetOtp!==otp){
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.isOtpVerified = true
        await user.save()
        return res.status(200).json({message:"OTP verified successfully"})
    }catch(err){
        console.log('Verify OTP error: ',err)
        return res.status(500).json({message:`Verify OTP error: ${err}`})
    }
}


    