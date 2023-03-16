import express from 'express'
import { verify } from '../controllers/verify_token.js'

const router = express.Router()

router.get('/', verify)

export { router as VerifyRoute }