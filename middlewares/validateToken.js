import jwt from "jsonwebtoken" 
export function check(req,res,next){
    let token=req.headers.Authorization;
    if(!token)
        return res.status(401).json({title:"First, log in",massage:"unauthorized"})
    try{
        let result=jwt.verify(token,process.env.SECRET_KEY);
        req.user=result;
        next();
    }
    catch(err){
        return res.status(401).json({title:"First, log in",massage:"unauthorized "+err.massage})
    }
    
}



export function checkManager(req,res,next){
    let token=req.headers.authorization;
    console.log(req.headers)
    if(!token)
        return res.status(401).json({title:"First, log in",massage:"unauthorized"})
    try{
        let result=jwt.verify(token,process.env.SECRET_KEY);
        req.user=result;
        if(result.role==="admin")
            next();
        else
             return res.status(403).json({title:"You do not have permission"})
    }
    catch(err){
        return res.status(401).json({title:"First, log in",massage:"unauthorized "+err.message})
    }
    
}
