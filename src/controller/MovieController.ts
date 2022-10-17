import { Request, Response } from 'express'
import Movie from "../models/Movie";
import axios from 'axios';
import { AppDataSource } from '../database/connect';
import { generateKeySync } from 'crypto';
import { SimpleConsoleLogger } from 'typeorm';


class movieController {
    async create (req: Request, res: Response) {
        // pegar o titulo no body da requisição
        const title=req.body.title
        // integrar com o primeiro endpoint passando o titulo e pegar o movieId do imdb para chamar o segundo
        const response = await axios.get(`https://imdb-api.com/en/API/SearchMovie/k_8qwlljj8/${title}`)
        const imdbId=response.data.results[0].id
        console.log(imdbId)
        // integrar com o segundo endpoint para pegar as informações relevantes (genres, runtimeMins, imdbRating)
        const responseGetMovie = await axios.get(`https://imdb-api.com/en/API/Title/k_8qwlljj8/${imdbId}`)
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
        
    //async findById (req: Request, res: Response) {
        //console.log(req.body.id)
        //let Movie = await axios.get(`https://imdb-api.com/en/API/Title/k_wpz80rsa/tt1375666/${req.body.id}`)
        //return res.status(200).json(Movie);
        //}

        
}
export default movieController

    // const movieRepository = AppDataSource.getRepository(Movie);
    // const movieExists = await movieRepository.findOne({title: req.body.title})
    // if (movieExists) {
    //   console.log(`Movie ${req.body.name} already exist`)
    //   return res.status(400).json({message: `Movie ${req.body.title} already exist`})
    // }
    // const response = await axios.get(` https://imdb-api.com/en/API/SearchMovie/k_wpz80rsa/inception%202010=${req.body.name}`)
    // const moviesAppearence = response.data.results[0].films.length
    // let movieCreated = await movieRepository.create({ title: req.body.title, });
 //console.log(JSON.stringify(response.data, null, 2))
    