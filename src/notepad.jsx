const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/invoice_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: String,
  dueDate: String,
  billTo: {
    name: String,
    address: String,
    email: String
  },
  items: [{
    description: String,
    quantity: Number,
    rate: Number,
    amount: Number
  }],
  notes: String,
  subtotal: Number,
  tax: Number,
  total: Number
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);


app.post('/api/invoices', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
