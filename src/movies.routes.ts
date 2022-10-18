import { Router } from 'express'
import MovieController from '../src/controller/MovieController'

const router = Router()
const movieController = new MovieController()

router.post('/movies', movieController.create)
router.delete('/movies/:id', movieController.delete)

export default router