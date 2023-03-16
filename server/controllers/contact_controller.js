import { contactFormatModel } from "../models/contact_format.js"
import { commons } from "../static/message.js"

const contact = async (req, res, next) => {
    
    const {name, email, message} = req.body

    if (typeof name === 'undefined' || typeof email === 'undefined' || typeof message === 'undefined') {
        res.status(406).json({
            message: commons.invalid_params,
            format: "[name, email, message]"
        })
        return next()
    }

    const contactFormat = new contactFormatModel({name, email, message})

    try {contactFormat.save()} 
    catch (err) {
        console.log(err)
        res.status(500).json({message: "Error saving into database."})
        return next()
    }

    res.status(200).json({message: "Saved"})
}

export {contact as contactController}