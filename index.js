const express = require('express');
const cors = require('cors');

const getTechStack = require("./routes/getTechStack.js")
const getMultiMedia = require("./routes/getMultiMedia.js")

const app = express();
app.use(cors());

// Route with query parameters
app.get('/getTechStack', async (req, res) => {
  const url = req.query.url;

  const output = await getTechStack(url)
  res.json(output.data)
});

app.get('/getMultiMedia', async (req, res) => {
  const url = req.query.url;
  console.log(url)
  const output = await getMultiMedia(url)
  res.json(output)
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
