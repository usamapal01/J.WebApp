const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const customerRouter = require("./routes/customerForm");
const customerViewRouter = require("./routes/customerView");
const requestRouter = require("./routes/requests");
const addRequestRouter = require("./routes/addRequest");
const requestPageRouter = require("./routes/requestPage");
const twilioRequestRouter = require("./twilioRequest");
const twilioWelcomeSMSRouter = require("./twilioWelcomeSMS");
const loginRouter = require("./routes/login");
const dotenv = require("dotenv");
const app = express();
const path = require('path');

dotenv.config({ path: "./.env" });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", loginRouter);
// customer form routes
app.use("/customer", customerRouter);
//app.use('/display-customer', customerViewRouter); // for some reason this code is displaying REQUESTS
app.get("/display-customer", customerViewRouter);
app.put("/update-customer/:id", customerViewRouter);
app.delete("/delete-customer/:id", customerViewRouter);
// app.use('/customer-requests', customerRouter);
app.get("/customer-requests", requestRouter);
app.post("/add-request", addRequestRouter);

// This is resposible for displaying individual requests
app.get("/:request_id/user-request", requestPageRouter);
app.delete("/:request_id/user-request", requestPageRouter);
app.put("/:request_id/user-request", requestPageRouter);
// app.post('/customer-requests', requestRouter)
// app.delete('/customer-requests', requestRouter)

// resposible for sending indivdual messages
app.use("/", twilioRequestRouter);

// resposible for sending a welcome messages
app.post("/welcome-message", twilioWelcomeSMSRouter);

//============================================================================
// Serve static assets (React build) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith("/customer") || 
        req.path.startsWith("/display-customer")) 
        //... any other API endpoints you want to exclude
        {
      return next();  // Skip to the next middleware if it's one of your API routes
    }
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
//================================================================================

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
