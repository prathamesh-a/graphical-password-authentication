import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema

const contactFormat = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
})

contactFormat.plugin(mongooseUniqueValidator)

const contactFormatModel = mongoose.model('Message', contactFormat)

export { contactFormatModel }