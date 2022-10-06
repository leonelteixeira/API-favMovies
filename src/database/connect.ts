import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["src/models/*.ts"],
    synchronize: true,
    logging: false,
})

AppDataSource.initialize()
    .then(() => {
        console.log('📦 Sucessfully connected with database');   
    })
    .catch((error) => console.log(error))

