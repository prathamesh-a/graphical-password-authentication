import { usertModel as User } from '../models/user.js'
import { commons, validation_messages as msg } from '../static/message.js';

const check = async (req, res, next) => {
    let user;
    var {username, email} = req.query

    if (typeof username === 'undefined' && typeof email === 'undefined') {
        res.status(500).json({
            message: commons.invalid_params,
            format: "username or email"
        })
        return next()
    }
    
    if (typeof email === 'undefined') {
        username = username.toLowerCase()
        try { user = await User.findOne({username: username}) }
        catch (err) { res.status(400).json({message: msg.search_err}) }
        if (user) res.status(200).json({exists: true})
        else res.status(200).json({exists: false})
    }
    else if (typeof username === 'undefined') {
        try { user = await User.findOne({email: email}) }
        catch (err) { res.status(400).json({message: msg.search_err}) }
        if (user) res.status(200).json({exists: true})
        else res.status(200).json({exists: false})
    }
}

export { check } 