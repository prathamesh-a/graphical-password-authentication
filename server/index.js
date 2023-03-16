// import * as dotenv from 'dotenv'
// dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs/promises'
import { VerifyRoute } from './routes/verify.js'
import { DigestRoutes } from './routes/digest.js'
import { router as contactRoutes } from './routes/contact.js'
import { router as imageRoutes } from './routes/image.js'
import { router as userRoutes } from './routes/users.js'

console.log(process.env)

const app = express()
const swaggerDocument = JSON.parse(
    await fs.readFile(
        new URL('./swagger.json', import.meta.url)
    )
)

app.use(cors())
app.use(bodyParser.json())

app.use('/api/verify', VerifyRoute)
app.use('/api/user/', userRoutes)
app.use('/api/image/', imageRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/contact', contactRoutes)
app.use('/api/digest', DigestRoutes)

mongoose.set('strictQuery', true)
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.ajnurbv.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT)
        console.log("Server running...")
    })
    .catch(err => console.log(err))


// const currentAttempts = await userAttemptsModel.findOne({email: "test@gmail.com"})
// userAttemptsModel.findOneAndUpdate({email: "test@gmail.com", attempts: currentAttempts.attempts+1}).then(res => console.log(res)).catch(err => console.log(err))

// await usertModel.findOne({username: "test"})

// const testAttempts = new userAttemptsModel({
//     username: "test2",
//     email: "test2@gmail.com",
//     attempts: 0
// })

//testAttempts.save().then(res => console.log(res)).catch(err => console.log(err))

// transporter.sendMail(mailOptions, function(err, info) {
//     if (err) console.log(err)
//     else console.log("Email Sent: " + info.response)
// })

// const result = unsplash.search.getPhotos({
//     query: 'cats',
//     perPage: 64,
//     orientation: 'squarish'
// }).then(result => console.log(result.response.results))