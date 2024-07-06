require('dotenv').config()

module.exports = {
  URI: `mongodb+srv://${process.env.MONGO_CRED}@dvd-brew.78j48c9.mongodb.net/?appName=dvd-brew`
};