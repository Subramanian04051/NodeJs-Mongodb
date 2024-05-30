const jwt=require('jsonwebtoken')
const express=require('express')
const app=express()
const secret_key="Secret-key"
const router=express.Router() 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
router.post('/Login',(req,res,next)=>
{ 
    try{
    var userobj={}
    const secret_key="Secret-key"
    Object.assign(userobj,req.body.user_Details)
    const token=jwt.sign(userobj,secret_key,{expiresIn:60*10})
    res.send({status:"SUCCESS",token:token})
    }
    catch(error)
    {
        console.log(error)
        res.send({status:"SUCCESS",token:null})
    }
})
const TokenVerify=function(req,res,next)
{
    const token=req.headers['authorization']
    //console.log(req.headers) 
    jwt.verify(token,secret_key,(err,decoed)=>
    {
        if(err)
            {
                res.send({status:"Failure",data:"SESSION LOGOUT"})
            } 
            else{
                res.send({status:"Success",data:req.body.numbers.first_no+req.body.numbers.second_no})
            }
})
}       
//app.use(Middleware)

router.post('/Calc',TokenVerify,(req,res,next)=>
{
    res.send(req.params.First+req.params.Second)
    
               // console.log(decoed)
      //      }
    //}) 
})

app.use(router)
//module.ex

app.listen(8080,()=>
{
    console.log('server is listening in 8080')
})
