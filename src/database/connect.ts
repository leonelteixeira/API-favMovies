import "reflect-metadata"
import { DataSource } from "typeorm"
import  Movie  from "../models/Movie"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log('📦 Sucessfully connected with database');   
    })
    .catch((error) => console.log(error))

export { AppDataSource }