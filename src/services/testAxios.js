// src/services/testAxios.js
const axios = require('axios');

const testAxios = async () => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error with axios.post:', error.message);
  }
};

testAxios();
