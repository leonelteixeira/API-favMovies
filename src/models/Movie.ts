import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import MovieController from "../controller/MovieController"

@Entity({ name: "FavoriteMovies"})
export default class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    title: string

    @Column({name: "runtime_mins", nullable: true })
    runtimeMins: number

    @Column({ nullable: true })
    genres: string

    @Column({name: "imdb_rating", type: 'real', nullable: true })
    imdbRating: number
}
