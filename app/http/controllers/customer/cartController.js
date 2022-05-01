function cartController() {
    return{
        index(req, res){
            return res.status(200).render("customer/cart");
        }
    }
    
};

module.exports = cartController;