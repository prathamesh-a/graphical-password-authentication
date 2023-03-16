import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema

const digestSchema = new Schema({
    email: {type: String, required: true, unique: true}
})

digestSchema.plugin(mongooseUniqueValidator)

const digestModel = mongoose.model('Digest', digestSchema)

export {digestModel}