import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    runtime_mins: number

    @Column()
    genres: string

    @Column()
    imdb_rating: number
}