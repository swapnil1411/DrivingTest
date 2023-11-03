module.exports = (req, res) => {
   let success = req.query.param;
   let message = '';
   let result = ''; // Define the 'message' variable

   res.render('login', { message: message, result: result, success: success });
}