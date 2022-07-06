import { Schema, model, models } from "mongoose";

const attemptsSchema = new Schema({
  username: String,
  arr : [String],
  createdAt:  { type: Date, expires: '1440m', default: Date.now },
});


const attemptsModel = models.attempt || model("attempt", attemptsSchema);

export default attemptsModel;

