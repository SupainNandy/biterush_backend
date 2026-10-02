import jwt from 'jsonwebtoken'
const genToken =async(userId)=>{
    try{
        const token = await jwt.sign({userId},process.env.JWT_SKEY,{expiresIn:'7d'})
        return token
    }catch(err){
        console.log('Token genration error',err)
    }
}

export default genToken