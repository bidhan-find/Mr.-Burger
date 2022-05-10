const Order = require("../../../models/Order");
const moment = require('moment');

function ordersController() {
    return {
        store(req, res) {
            // Validate request
            const { phone, address, paymentType, orderCart } = req.body;
            let cart = JSON.parse(orderCart);
            if (!phone || !address || !paymentType) {
                req.flash('error', 'All fields are required');
                req.flash('phone', phone);
                req.flash('address', address);
                return res.redirect('/cart');
            };

            const order = new Order({
                customerId: req.user._id,
                items: cart.items,
                phone,
                address,
                paymentType
            });

            order.save()
                .then(result => {
                    Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
                        // Emit event
                        const eventEmitter = req.app.get('eventEmitter');
                        eventEmitter.emit('orderPlaced', result);
                        res.status(200).json({ message: "Order placed successfully", order });
                    });
                })
                .catch(err => {
                    req.flash('error', "Something went wrong");
                    return res.redirect('/cart');
                });
        },

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            return res.status(200).render("customer/orders", { orders, moment: moment });
        },

        async show(req, res) {
            if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                const order = await Order.findById(req.params.id);
                if (req.user._id.toString() === order.customerId.toString()) {
                    return res.render('customer/singleOrder', { order });
                }
                return res.redirect('/');
            } else {
                return res.redirect('/');
            }
        }
    };
};

module.exports = ordersController;