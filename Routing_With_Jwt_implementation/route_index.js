const express=require('express')
const jwt=require('jsonwebtoken')
/* const express=require('../../SQL-Postgresql/N16 backend pack (unmodified)/N16 backend pack/node_modules/express')
const jwt=require('../../SQL-Postgresql/N16 backend pack (unmodified)/N16 backend pack/node_modules/jsonwebtoken') */
const app=express()
const router=express.Router()
const CalculatorHelper=require('./Calculator/Calculator')
const secret_key="Secret-key"
//const secondRoutes=require('./Secondapi/SecondApi')
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true }));
const TokenCheckMiddleware=function(req,res,next)
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
                next()
               // res.send({status:"Success",data:req.body.numbers.first_no+req.body.numbers.second_no})
            }
})
    
    
}

app.post('/Login',(req,res,next)=>
{
    try{
        var userobj={}
        
        Object.assign(userobj,req.body.user_Details)
        if(userobj.user_name=='hello' && userobj.password=='world')
            {
                const token=jwt.sign(userobj,secret_key,{expiresIn:'1hr'})
                res.send({status:"SUCCESS",token:token})
            }
            else{
                res.send({status:"Failure",token:null})
            }
        
        }
        catch(error)
        {
            console.log(error)
            res.send({status:"Failure",token:null})
        }

})
router.post('/Add',(req,res,next)=>
{
    
    try{
    res.send({status:"SUCCESS",data:CalculatorHelper.add(req.body.numbers)})
    }
    catch(error)
    {
        console.log(error)
        res.send({status:"SUCCESS",data:0})

    }
})
router.post('/Sub',(req,res,next)=>
    {
        try{
      
    res.send({status:"SUCCESS",data:CalculatorHelper.sub(req.body.numbers)}) 
}
catch(error)
{
    console.log(error)
    res.send({status:"SUCCESS",data:0})

}
        
    })
    router.post('/Mult',(req,res,next)=>
        {
            try{
      
                res.send({status:"SUCCESS",data:CalculatorHelper.mult(req.body.numbers)}) 
            }
            catch(error)
            {
                console.log(error)
    res.send({status:"SUCCESS",data:0})
            }
            
   // res.send({status:"SUCCESS",data:Mult})    
        })
        router.post('/Div',(req,res,next)=>
            {
                try{
      
                    res.send({status:"SUCCESS",data:CalculatorHelper.div(req.body.numbers)}) 
                }
                catch(error)
                {
                    console.log(error)
    res.send({status:"SUCCESS",data:0})
                }
            //res.send({status:"SUCCESS",data:Div})    
            })
//firstRoutes.div()
app.use(TokenCheckMiddleware)
app.use('/Calc',router)


app.listen(8080,()=>
{
    console.log('server is listening in port 8080')
})