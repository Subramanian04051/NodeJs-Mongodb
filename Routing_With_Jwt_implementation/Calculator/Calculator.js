const Mult=function(numbers)
{
    let Mult_keys=Object.keys(numbers),Mult=1
            Mult_keys.forEach((val)=>
    {
        Mult*=numbers[val]
    })
    return Mult
}
const Div=function(numbers)
{
    let Div_keys=Object.keys(numbers),Div=1
    Div_keys.forEach((val)=>
{
Div/=numbers[val]
})
return Div
}
const Add=function(numbers)
{
    let Add_keys=Object.keys(numbers),sum=0
    Add_keys.forEach((val)=>
    {
        sum+=numbers[val]
    })
    return sum
}
const Sub=function(numbers)
{
    let sub_keys=Object.keys(numbers),sub=0
    sub_keys.forEach((val)=>
{
    sub=numbers[val]-sub
})
    return sub
}
module.exports={
    mult:Mult,
    div:Div,
    add:Add,
    sub:Sub


}