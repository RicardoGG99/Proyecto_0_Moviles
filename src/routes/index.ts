import { Router } from 'express'
import { getSongs } from '../helpers/index.controller'
const router = Router()

router.get('/song', getSongs)
router.get('/song/:id', getSongs)

export default router;