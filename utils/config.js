require("dotenv").config()

const PORT = process.env.PORT


const MONGODB_URL = process.env.NODE_ENV === 'test' 
    ?  process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL


const SECRET = process.env.SECRET_KEY

module.exports = {
    PORT,
    MONGODB_URL,
    SECRET
}