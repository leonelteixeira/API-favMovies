import { Router } from 'express'
import MovieController from '../src/controller/MovieController'

const router = Router()
const movieController = new MovieController()

router.post('/movies', movieController.create)
router.delete('/movies/:id', movieController.delete)
router.get('/movies/:id', movieController.findOneBy)
router.get('/movies', movieController.findAndCountBy)

export default router 