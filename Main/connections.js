const mongoose = require('mongoose');
const mongoURI = "..."

const connectToMongo = async() =>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to Mongo successfully')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}
module.exports = connectToMongo;
