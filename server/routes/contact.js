import express from "express"
import { contactController } from "../controllers/contact_controller.js"

const router = express.Router()

router.post('/', contactController)

export { router }