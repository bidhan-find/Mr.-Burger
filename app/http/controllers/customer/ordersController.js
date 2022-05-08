const Order = require("../../../models/Order");

function ordersController() {
    return {

        store(req, res) {
            // Validate request
            const { phone, address, paymentType, orderCart } = req.body;

            let cart = JSON.parse(orderCart)
            if (!phone || !address || !paymentType) {
                req.flash('error', "All fields are required");
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
                        req.flash('success', 'Order placed successfully');
                        // Emit event
                        res.status(200).json({ order })
                        // return res.redirect('/customer/orders');
                    });
                })
                .catch(err => {
                    req.flash('error', "Something went wrong");
                    return res.redirect('/cart');
                });
        },

        index(req, res) {
            return res.status(200).render("customer/orders");
        }
    }

};

module.exports = ordersController;