import { Request, Response } from 'express'
import Movie from "../models/Movie";
import axios from 'axios';
import { AppDataSource } from '../database/connect';
import { generateKeySync } from 'crypto';
import { createQueryBuilder, SimpleConsoleLogger } from 'typeorm';
import { ListMoviesResponse } from '../dto/ListMoviesResponse';
import { ListGetMovieResponse } from '../dto/ListGetMovieResponse';
import { title } from 'process';

// Ai que delicia !!!!!!!!!!!!!!!!!!!!!!!
class movieController {
    async create (req: Request, res: Response) {
        // pegar o titulo no body da requisição
        const title=req.body.title
        // integrar com o primeiro endpoint passando o titulo e pegar o movieId do imdb para chamar o segundo
        const response = await axios.get(`https://imdb-api.com/en/API/SearchMovie/k_8qwlljj8/${title}`)
        const listMoviesResponse: ListMoviesResponse = response.data
            if (!listMoviesResponse.results.length) { 
                console.log(`Movie ${req.body.title} don't exist!!`)
                return res.status(400).json(`Movie ${title} don't exist!!`)
            } 
        const imdbId = listMoviesResponse.results[0].id
        console.log(imdbId)
        // integrar com o segundo endpoint para pegar as informações relevantes (genres, runtimeMins, imdbRating)
        const responseGetMovie = await axios.get(`https://imdb-api.com/en/API/Title/k_8qwlljj8/${imdbId}`)
        const listGetMovieResponse: ListGetMovieResponse = responseGetMovie.data
        console.log(responseGetMovie.data)
        
        // montar um Objeto Movie com as informações (Title, genres, runtimeMins, imdbRating)
        const movie = new Movie()
        movie.title = responseGetMovie.data.title
        movie.genres = responseGetMovie.data.genres
        movie.runtimeMins = responseGetMovie.data.runtimeMins
        movie.imdbRating = responseGetMovie.data.imDbRating
        console.log(movie)
        // salvar esse objeto no banco de dados postgres
        const movieSave = await AppDataSource.manager.save(movie)
        console.log("Movie has been saved with Id", movie.id )
        console.log(movieSave)
        // retornar 201 created com o filme criado no banco de dados
        const savedMovies = await AppDataSource.manager.find(Movie)
        console.log("All movies from the DataBase: ", savedMovies)
        
        //console.log(response.data)
        return res.status(201).json(movieSave);
    } 
    
    async delete (req: Request, res: Response) {
        const movieRepository = AppDataSource.getRepository(Movie)
        const id = req.params.id
        const result = await movieRepository.delete(id)
        console.log(result)
        console.log("Movie with Id:", id, "was deleted!!")
        return res.status(200).json(`Movie with Id: ${id} was deleted!!`)
    }

    async findOneBy (req: Request, res: Response) {
        const movieRepository = AppDataSource.getRepository(Movie) 
        const id = req.params.id
        const result = await movieRepository.findOneBy(req.params)
            if (!result) { 
                console.log(`Movie with Id: ${id} don't exist!!`)
                return res.status(404).json(`Movie with Id: ${id} don't exist!!`)}
        console.log(result)
        return res.status(200).json(result)
    }

    async findAndCountBy (req: Request, res: Response) {
        const movieRepository = AppDataSource.getRepository(Movie)
        const movieAllList = await movieRepository.find({
            order: {
                imdbRating: "DESC"
            }
        }) 
        console.log(movieAllList)
        return res.status(200).json(movieAllList)
    }
    
        
}
export default movieController

    
    