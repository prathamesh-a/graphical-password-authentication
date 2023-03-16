import express from "express"
import { digestController } from "../controllers/digest_controller.js"

const router = express.Router()

router.post('/', digestController)

export {router as DigestRoutes}