const commons = {
    invalid_params: 'Invalid request params, please check format below.',
    token_failed: 'Internal server error, try again later.'
}

const login_messages = {
    format: ["username", "password", "pattern" ],
    db_user_failed: 'Error occured while logging in, please try again later.',
    user_not_exist: 'User does not exists.',
    db_pass_failed: 'Error occured while logging in, please try again later.',
    invalid_credentials: 'Invalid credentials given.',
    success: 'Logged in successfully.'
}

const signup_messages = {
    format: ["username", "email", "password", "pattern", "sets", "sequence"],
    db_user_failed: 'Error occured finding user on DB, please try again later.',
    user_already_exist: 'User already exists.',
    pass_hash_err: 'Error occured while hashing passwprd, please try again later.',
    db_save_err: 'Error occured while saving into db, please try again later.',
}

const validation_messages = {
    search_err: 'Error occured while searching, please try again later.'
}

export { login_messages, signup_messages, commons, validation_messages }
