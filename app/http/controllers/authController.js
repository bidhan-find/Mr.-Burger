function authController() {
    return{
        login(req, res){
            return res.status(200).render("auth/login");
        },
        register(req, res){
            return res.status(200).render("auth/register");
        },
    }
    
};

module.exports = authController;