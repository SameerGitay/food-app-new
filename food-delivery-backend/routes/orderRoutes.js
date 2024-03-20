const express = require('express')
const Order = require('../models/Order')

const orderRouter = express.Router()

orderRouter.post('/order', async (req, res) => {
    let data = req.body.order_data

    await data.splice(0, 0, { Order_Date: req.body.order_date })


    let eId = await Order.findOne({ 'email': req.body.email })

    if (eId == null) {
        try {
            const odr = await Order.create({
                email: req.body.email,
                order_data: [data]
            })

            res.json({ success: true, data: odr })
        } catch (error) {
            res.status(400).json({ success: false, msg: "Error creating order" })
        }
    } else {
        try {
            const odr2 = await Order.findOneAndUpdate({ email: req.body.email },
                {
                    $push: {
                        order_data: data
                    }
                })
            res.json({ success: true, data: odr2 })
        } catch (error) {
            res.status(400).json({ success: false, msg: "Error creating order" })
        }
    }
})

orderRouter.post('/orders', async (req, res) => {
    try {
        let myOrders = await Order.findOne({ email: req.body.email })

        if (myOrders) {
            res.json({ success: true, data: myOrders.order_data.reverse() })
        } else {
            res.json({ success: true, data: [] })
        }

    } catch (error) {
        res.status(400).json({ success: false, msg: "Error retrieving orders" })
    }
})

module.exports = orderRouter