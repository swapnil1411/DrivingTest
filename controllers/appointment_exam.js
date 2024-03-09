const User = require('../models/User');

module.exports = async (req, res) => {
    let message = req.query.param;
    try {
        // const userId = req.session.userId;
        let userData = await User.find({usertype:"Driver"})
        console.log(userData);
        res.render("exam", { userData: userData, message: message });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}