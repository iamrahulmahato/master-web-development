const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const CLIENT_ID = '8c012c7168f33b12a2d2a91597e46402';
const CLIENT_SECRET = '9e394a35e755bc9a4cb515a243d48e54d4f24826b4f545d996438829a42c333b';

app.use(bodyParser.json());
app.use(cors());

app.post('/execute', async (req, res) => {
  const { script, language, versionIndex } = req.body;

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: script,
      language: language,
      versionIndex: versionIndex,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      console.log(response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from JDoodle API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
