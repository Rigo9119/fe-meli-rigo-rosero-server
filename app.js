import express from 'express';
import itemRoutes from './routes/items.js';

const app = express();
const PORT = 5050;

express.json();

app.use('/api/items', itemRoutes);

app.listen(PORT, () => console.log(`Serverruning at http://localhost:${PORT}`));
