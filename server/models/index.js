import mongoose from 'mongoose'

const connectDb = async() => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
};

module.exports = connectDb