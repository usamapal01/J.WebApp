const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRouter = require('./routes/customerForm');
const customerViewRouter = require('./routes/customerView');
const requestRouter = require('./routes/requests');
const addRequestRouter = require('./routes/addRequest');
const requestPageRouter = require('./routes/requestPage');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// customer form routes
app.use('/customer', customerRouter);
//app.use('/display-customer', customerViewRouter); // for some reason this code is displaying REQUESTS
app.get('/display-customer', customerViewRouter);
app.put('/update-customer/:id', customerViewRouter)
app.delete('/delete-customer/:id', customerViewRouter)
// app.use('/customer-requests', customerRouter);
app.get('/customer-requests', requestRouter)
app.post('/add-request', addRequestRouter)


// This is resposible for displaying individual requests
app.get('/:request_id/user-request', requestPageRouter);
// app.post('/customer-requests', requestRouter)
// app.delete('/customer-requests', requestRouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});