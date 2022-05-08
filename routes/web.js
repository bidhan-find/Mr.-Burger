const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const menuController = require("../app/http/controllers/customer/menuController");
const ordersController = require("../app/http/controllers/customer/ordersController");
const homeController = require("../app/http/controllers/homeController");


function initRoutes(app) {
    app.get('/', homeController().index);
    
    // Auth routes
    app.get('/login', authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.get('/register', authController().register);
    app.post('/register', authController().postRegister);

    // Customer routes
    app.get('/cart', cartController().index);
    app.get('/menu', menuController().index);
    app.post('/orders', ordersController().store)
    app.get('/customer/orders', ordersController().index);

    


};

module.exports = initRoutes;