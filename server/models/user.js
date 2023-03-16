import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 8 },
    pattern: { type: [String], required: true },
    sequence: { type: Boolean, required: true },
    sets: {type: [[Object]], required: true}
})

userSchema.plugin(mongooseUniqueValidator)

const usertModel = mongoose.model('User', userSchema)

export { usertModel } 