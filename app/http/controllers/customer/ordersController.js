function ordersController() {
    return{
        index(req, res){
            return res.status(200).render("customer/orders");
        }
    }
    
};

module.exports = ordersController;