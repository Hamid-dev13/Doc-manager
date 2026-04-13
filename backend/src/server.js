const express = require('express');
const cors = require('cors');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
