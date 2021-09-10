const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
connectDB();

app.use(cors({credentials: true, origin: true}));
app.options("*", cors());

console.log('Run server');

const port = process.env.PORT || 4000;

app.use(express.json({extended: true}));

// Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'));
app.use('/api/shifts', require('./routes/shifts'));
app.use('/api/times', require('./routes/times'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dates', require('./routes/dates'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})

