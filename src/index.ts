import 'dotenv/config'

import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
});
