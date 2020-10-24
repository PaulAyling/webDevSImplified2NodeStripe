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

app.set('view engine', 'ejs')
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

app.listen(3000)