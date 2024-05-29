const jwt=require('jsonwebtoken')
const express=require('express')
const app=express()

const router=express.Router()
router.post('/Login',(req,res,next)=>
{
    try{
    var userobj={}
    const secret_key="Secret-key"
    Object.assign(userobj,req.params.user_Details)
    const token=jwt.sign(userobj,secret_key,{expiresIn:60*10})
    res.send({status:"SUCCESS",token:token})
    }
    catch(error)
    {
        console.log(error)
        res.send({status:"SUCCESS",token:null})
    }
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)
//module.ex

app.listen(8080,()=>
{
    console.log('server is listening in 8080')
})
