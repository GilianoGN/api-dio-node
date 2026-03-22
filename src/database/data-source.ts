import 'reflect-metadata';
import { DataSource } from 'typeorm';

const databasePath = process.env.NODE_ENV === 'test'
    ? 'src/database/database.test.sqlite'
    : 'src/database/database.sqlite';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databasePath,
    synchronize: false,
    logging: false,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
});

export default async(): Promise<DataSource> => {
    if (!AppDataSource.isInitialized){
        return AppDataSource.initialize();
    }
    return AppDataSource;
}