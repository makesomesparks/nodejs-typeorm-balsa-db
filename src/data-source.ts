import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Data } from "./entity/Data";

export const Source = (username: string) =>
{
    const option: DataSourceOptions = {
        type: "sqlite",
        database: `${ username }.sqlite`,
        synchronize: true,
        logging: false,
        entities: [ Data ],
        migrations: [],
        subscribers: [],
    };

    return new DataSource(option);
};