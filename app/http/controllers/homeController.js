const getShuffledArr = require("../../config/shuffledArr");
const Menu = require("../../models/Menu");

function homeController() {
    return {
        async index(req, res) {
            const burgers = await Menu.find();
            return res.status(200).render("home", { burgers: getShuffledArr(burgers).slice(0, 8) });
        }
    }

};

module.exports = homeController;