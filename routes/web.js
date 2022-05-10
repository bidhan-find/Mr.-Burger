const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customer/cartController");
const menuController = require("../app/http/controllers/customer/menuController");
const ordersController = require("../app/http/controllers/customer/ordersController");
const homeController = require("../app/http/controllers/homeController");
const adminOrderController = require("../app/http/controllers/admin/ordersController");
const statusController = require("../app/http/controllers/admin/statusController");

// Middlewares
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");


function initRoutes(app) {
    app.get('/', homeController().index);

    // Auth routes
    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    // Customer routes
    app.get('/cart', cartController().index);
    app.get('/menu', menuController().index);
    app.post('/orders', auth, ordersController().store)
    app.get('/customer/orders', auth, ordersController().index);
    app.get('/customer/orders/:id', auth, ordersController().show);

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index);
    app.post('/admin/order/status', admin, statusController().update);
};

module.exports = initRoutes;