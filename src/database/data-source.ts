import 'reflect-metadata';
import { User } from '../entities/User.js';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV === 'test' ? ':memory:' : 'src/database/database.sqlite',
    synchronize: process.env.NODE_ENV === 'test',
    logging: false,
    entities: [ User ],
    migrations: process.env.NODE_ENV === 'test' ? [] : ["./src/database/migrations/*.ts"],
});

export default async(): Promise<DataSource> => {
    if (!AppDataSource.isInitialized){
        return AppDataSource.initialize();
    }
    return AppDataSource;
}