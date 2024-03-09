const Appointment = require('../models/Appointment');
const User = require('../models/User');
module.exports = async (req, res) => {
    try {
        console.log("🚀 ~ module.exports= ~ req:", req.body)

        // Retrieve data from the request body
        const { fName, examResult } = req.body;
        
        if(fName){
            let userData = await User.findOne({ fname:fName });
            
            if (userData) {
                let result;
                if(examResult === "pass"){
                    result=true
                }
                else if(examResult === "fail"){
                    result=false
                }
                // Update the exam result for the appointment
                userData.examResult = result;
                await userData.save();
                console.log("Exam result updated:", userData);
                // Redirect to dashboard or render a success page
                res.redirect('/dashboard');
            } else {
                console.log("User not found.");
                // Handle appointment not found case (redirect or render error page)
                res.status(404).send("User not found.");
            }
        }

        else {
            console.log("Fname not found.");
            // Handle appointment not found case (redirect or render error page)
            res.status(404).send("Fname not found.");
        }

        // Find the appointment based on date and time
       
    } catch (error) {
        console.error("Error processing exam result:", error);
        // Handle error (redirect or render error page)
        res.status(500).send("Internal server error");
    }
}
