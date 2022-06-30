import { Schema, model, models } from "mongoose";

const attemptsSchema = new Schema({
  username: String,
  arr : [String]
},{timestamps: true});

attemptsSchema.index({createdAt: 1},{expireAfterSeconds: 60*60*24})

const attemptsModel = models.attempt || model("attempt", attemptsSchema);

export default attemptsModel;

