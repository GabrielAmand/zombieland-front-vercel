import express from 'express'

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});