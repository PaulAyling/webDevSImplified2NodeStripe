if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

console.log('stripe Public key', stripePublicKey)
console.log('stripe secret key', stripeSecretKey)

const express = require('express')
//same as create server
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(3000)