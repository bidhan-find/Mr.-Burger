function menusController() {
    return{
        index(req, res){
            return res.status(200).render("customer/menus");
        }
    }
    
};

module.exports = menusController;