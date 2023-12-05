const mongoose = require("mongoose");

// Set the 'strictQuery' option to false to prepare for the change in Mongoose 7
mongoose.set("strictQuery", false);

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
