const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const menusController = require("../app/http/controllers/customer/menusController");
const ordersController = require("../app/http/controllers/customer/ordersController");
const homeController = require("../app/http/controllers/homeController");



function initRoutes(app) {
    app.get('/', homeController().index);
    app.get('/menus', menusController().index);
    app.get('/orders', ordersController().index);
    app.get('/cart', cartController().index);
    app.get('/login', authController().login);
    app.get('/register', authController().register);
};

module.exports = initRoutes;