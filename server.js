if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

console.log('Server Loading')


const express = require('express')
const app = express()
//read files
const fs = require('fs')
const { request } = require('https')
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/store', function(req,res){
  fs.readFile('items.json', function(error,data){
    if (error){
      res.status(500).end()
    } else {
      //pass down content
      res.render('store.ejs', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req,res){
  fs.readFile('items.json', function(error,data){
    if (error){
      res.status(500).end()
    } else {
     console.log('Last GIT update got here: purchase applied for')
     const itemsJson = JSON.parse(data)
     const itemsArray = itemsJson.music.concat(itemsJson.merch)
     let total = 0
     request.body.items.forEach(function(item){
       const itemJson = itemsArray.find(function(i) {
         return i.id == item.id
       })
       total= total + itemJson.price * item.quantity
     })
     stripe.charges.create({
       amount:total,
       source: request.body.stripTokenId,
       currency:'usd'
     }).then(function(){
       console.log('charge successfull')
       res.json({ message:'succesfully purchased items'})
     }).catch(function(){
       console.log('charge failed')
       res.status(500).end()
     })
    }
  })
})

app.listen(3000)