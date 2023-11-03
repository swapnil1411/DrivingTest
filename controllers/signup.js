module.exports = (req, res) => {
   let alert = req.query.param;
   const message = "";
   const userData = "";
   res.render('signup', { message: message, userData: userData, alert: alert });
}