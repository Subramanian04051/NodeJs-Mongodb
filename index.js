const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const exhbs=require('express-handlebars')
const dbo=require('./db')
const ObjectId=dbo.ObjectId
app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs')
app.set('views','views')
app.use(bodyparser.urlencoded({extended:true}))//for giving middleware
app.get('/',async (req,res)=> 
{
let database=await dbo.getDatabase()
const collection=database.collection('employee')
const cursor=collection.find({})
let employee=await cursor.toArray()
    let message=""
    if(req.query.status=='1')
    {
        message="Inserted Successfully"
    }
   /* if(req.query.status=='2'){

    }*/
    res.render('main',{message,employee})
})

app.post('/store_emp',async function(req,res)
{
    let database=await dbo.getDatabase()
    const collection=database.collection('employee') //using the collection books
   // let emp={eid:req.body.eid,name:req.body.name}
    let length=await collection.countDocuments({}) 
    //console.log(length)
    let emp={dept:req.body.dept,name:req.body.name,eid:length+1}
    if(await collection.insertOne(emp))
    {
    return res.redirect('/?status=1')
    }

})
app.post('/update_emp/:edit_id',async function(req,res)
{
    let database=await dbo.getDatabase()
    const collection=database.collection('employee') //using the collection books
   // let emp={eid:req.body.eid,name:req.body.name}
   // let length=await collection.countDocuments({}) 
    //console.log(length)
    let emp={dept:req.body.dept,name:req.body.name}
    if(await collection.UpdateOne(emp))
    {
    return res.redirect('/?status=2')
    }

})

app.listen(8000,()=>{console.log('listening on port:8000')})