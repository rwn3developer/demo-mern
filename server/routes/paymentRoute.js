const express = require('express');

const routes = express.Router();

const stripe = require('stripe')("sk_test_51LR68RSAWUNK4wOVFwP5RXNq3ymx5Nn64UJPCqGRLV09DKvj6Uliy123wvH6ozMKFTAZGKhIIlTjxa8UMOy8eqm300ONyuVXMN")

routes.post('/stripe', async (req, res) => {
    try {

        const { token, amount } = req.body;
        console.log(token, amount);

        // Create a PaymentMethod using the card token
        stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: token.id
            }
        }).then((paymentMethod) => {
            // Create a PaymentIntent with the created PaymentMethod
            return stripe.paymentIntents.create({
                amount: amount * 100, // Convert amount to cents
                currency: 'usd',
                payment_method: paymentMethod.id,
                confirm: true,
                receipt_email: token.email
            });
        }).then((paymentIntent) => {
            // Respond with the paymentIntent
            return res.status(200).send({
                paymentIntent: paymentIntent
            });
        }).catch((err) => {
            // Handle errors
            console.error("Error:", err);
            return res.status(500).send({
                error: err.message
            });
        });





        // const {token,amount} = req.body;
        // console.log(token,amount);
        // stripe.customers.create({
        //     email : token.email,
        //     sourse : token
        // }).then((customers)=>{
        //     stripe.charge.create({
        //         amount : amount * 100,
        //         currency : 'usd',
        //         customers : customers.id,
        //         receipt_email : token.email
        //     })
        // }).then((result)=>{
        //     return res.status(200).send({
        //         result
        //     }) 
        // })
    } catch (err) {
        console.log(err);
        return false
    }
})

module.exports = routes;