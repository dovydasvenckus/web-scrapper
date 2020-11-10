
module.exports = async function getData(url) {
  const axios = require('axios');
  const data = await axios.get(url);
  return data;
}