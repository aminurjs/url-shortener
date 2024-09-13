const { Mongoose } = require("mongoose");

export async function connectToMongoDB(url) {
  return Mongoose.connect(url);
}
