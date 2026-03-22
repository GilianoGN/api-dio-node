import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/database.sqlite",
    synchronize: false,
    logging: false,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
//    cli: {
//        migrationsDir: "./src/database/migrations/"
//    }
});

export default async(): Promise<DataSource> => {
    if (!AppDataSource.isInitialized){
        return AppDataSource.initialize();
    }
    return AppDataSource;
}