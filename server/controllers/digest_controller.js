import { digestModel } from "../models/digest.js"
import { commons } from "../static/message.js"

const digest = async (req, res, next) => {
    var currentEmail
    var newEmail
    const { email } = req.body

    if (typeof email === 'undefined') {
        res.status(406).json({
            message: commons.invalid_params,
            format: "email"
        })
        return next()
    }

    try {currentEmail = await digestModel.findOne({email: email})}
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error occured, try again later."})
        return next()
    }

    if (currentEmail) {
        res.status(500).json({message: "Already subscribed."})
        return next()
    }

    newEmail = new digestModel({email})

    try{newEmail.save()}
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Error occured, try again later."})
        return next()
    }
    
    res.status(200).json({message: "Subscribed"})

}

export {digest as digestController}