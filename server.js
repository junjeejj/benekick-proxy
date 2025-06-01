
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const { url, method = 'get', data } = req.body;

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API 요청 실패', detail: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
