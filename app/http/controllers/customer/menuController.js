const getShuffledArr = require("../../../config/shuffledArr");
const Menu = require("../../../models/Menu");

function menuController() {
    return {
        async index(req, res) {
            const burgers = await Menu.find();
            return res.status(200).render("customer/menu", { burgers: getShuffledArr(burgers) });
        }
    }

};

module.exports = menuController;