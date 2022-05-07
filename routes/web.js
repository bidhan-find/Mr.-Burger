const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const menuController = require("../app/http/controllers/customer/menuController");
const ordersController = require("../app/http/controllers/customer/ordersController");
const homeController = require("../app/http/controllers/homeController");


function initRoutes(app) {
    app.get('/', homeController().index);
    app.get('/menu', menuController().index);
    app.get('/customer/orders', ordersController().index);
    app.get('/cart', cartController().index);

    // Auth routes
    app.get('/login', authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.get('/register', authController().register);
    app.post('/register', authController().postRegister);
};

module.exports = initRoutes;