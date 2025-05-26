import jwt from "jsonwebtoken";

export function generateToken(user){
    console.log(user._id)
    let t=jwt.sign({
        userId:user._id,
        role:user.role,
        username:user.username
    },
    process.env.SECRET_KEY,
    {
        expiresIn:"60m"
    }
)
return t;
}