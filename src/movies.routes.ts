import { Router } from 'express'
import MovieController from '../src/controller/MovieController'

const router = Router()
const movieController = new MovieController()

router.post('/movies', movieController.create)
//router.get('/movies/id', movieController.findById)

export default router