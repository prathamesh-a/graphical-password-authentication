//import * as dotenv from 'dotenv'
import { usertModel as User } from '../models/user.js'
import bcrypt from "bcryptjs"
import { login_messages as  msg, commons} from '../static/message.js'
import jwt from 'jsonwebtoken'
import { checkArray, sendEmail } from '../util/util.js'
import { userAttemptsModel } from '../models/user_attempts.js'
import { nanoid } from 'nanoid'


const login = async (req, res, next) => {

    //dotenv.config()

    let token
    let existingUser
    let isValidPassword = false
    var isValidPattern = false
    var { username, password, pattern } = req.body
    username = username.toLowerCase()

    if (typeof username === 'undefined' || typeof password === 'undefined' || typeof pattern === 'undefined') {
        res.status(406).json({
            message: commons.invalid_params,
            format: msg.format
        })
        return next()
    }
    
    try { existingUser = await User.findOne({username: username}) }
    catch(err) {
        res.status(401).json({message: msg.db_user_failed})
        return next()
    }

    if (!existingUser) {
        res.status(401).json({message: msg.user_not_exist})
        return next()
    }

    const currentAttempts = await userAttemptsModel.findOne({username: username})

    if (currentAttempts.attempts > process.env.MAX_ATTEMPTS) {
        res.status(500).json({status: "blocked", message: "Your account has been blocked, please check email."})
        return next()
    }

    try { isValidPassword = await bcrypt.compare(password, existingUser.password) }
    catch(err) {
        console.log(err)
        res.status(500).json({message: msg.db_pass_failed})
        return next()
    }

    isValidPattern = checkArray(existingUser.pattern, pattern, true)

    if (!isValidPassword || !isValidPattern) {
        if (currentAttempts.attempts === Number(process.env.MAX_ATTEMPTS)) {
            await userAttemptsModel.findOneAndUpdate({username: username}, {attempts: currentAttempts.attempts+1, token: nanoid(32)}).catch(err => console.log(err))
            //console.log("sending email entered")
            sendEmail(currentAttempts.email)
        }
        await userAttemptsModel.findOneAndUpdate({username: username}, {attempts: currentAttempts.attempts+1}).catch(err => console.log(err))
        res.status(500).json({message: msg.invalid_credentials})
        return next()
    }

    try { token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.TOKEN_KEY) }
    catch (err) {
        console.log(err)
        res.status(500).json({message: commons.token_failed})
        return next()
    }
    await userAttemptsModel.findOneAndUpdate({username: username}, {attempts: 0}).catch(err => console.log(err))
    res.status(200).json({username: existingUser.username, userId: existingUser.id, email: existingUser.email, token: token})
}

export {login as loginController}