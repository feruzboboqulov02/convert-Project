require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/currency'));

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
});