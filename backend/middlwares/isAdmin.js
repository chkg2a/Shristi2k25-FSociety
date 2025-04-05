export const isAdmin=async(req,res)=>{
    try {
        if(req.user.role!=='admin'){
            return res.status(400).json({message:"You are not an admin"});
        } else {
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
}