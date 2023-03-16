import { usertModel } from '../models/user.js';
import { userAttemptsModel } from '../models/user_attempts.js';
import { commons, validation_messages as msg } from '../static/message.js';
import * as path from 'path'

const verify = async (req, res, next) => {

    const {email, token} = req.query
    let user

    if (typeof token === 'undefined' && typeof email === 'undefined') {
        res.status(500).json({
            message: commons.invalid_params,
            format: "token, email"
        })
        return next()
    }

    try { user = await usertModel.findOne({email: email}) }
    catch (err) { res.status(400).json({message: msg.search_err}); return next() }
    if (!user) {res.status(500).json({message: "User does not exists."}); return next()}

    const currentUser = await userAttemptsModel.findOne({email: email})
    const storedToken = currentUser.token

    if (storedToken === token) {
        await userAttemptsModel.findOneAndUpdate({email: email}, {attempts: 0, token: ""}).catch(err => console.log(err))
        res.sendFile(path.resolve() + '/views/unblocked.html')
    }
    else {
        res.send("Account is not blocked.")
    }

}

export {verify}