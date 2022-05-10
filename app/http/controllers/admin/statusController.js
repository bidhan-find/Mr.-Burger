const Order = require('../../../models/Order');

function statusController() {
    return {
        update(req, res) {
            Order.updateOne(
                { _id: req.body.orderId },
                { status: req.body.status },
                (err, data) => {
                    if (err) {
                        return res.redirect('/admin/orders');
                    }
                    // Emit event
                    return res.redirect('/admin/orders');
                }
            );
        }
    };
};

module.exports = statusController;