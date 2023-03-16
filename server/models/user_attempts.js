import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema

const userAttemptsSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    attempts: {type: Number, required: true},
    token: {type: String}
})

userAttemptsSchema.plugin(mongooseUniqueValidator)

const userAttemptsModel = mongoose.model('UserAttempts', userAttemptsSchema)

export { userAttemptsModel }