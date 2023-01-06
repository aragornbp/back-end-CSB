import 'dotenv/config';
import 'reflect-metadata';
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

const setDataSourceOptions = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(__dirname, "./migrations/**.{js,ts}")
  
  const nodeEnv = process.env.NODE_ENV;
  
  if(nodeEnv === "test"){
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"]
    }
  }
  
  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: port,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: true,
    synchronize: false,
    entities: [entitiesPath],
    migrations: [migrationsPath]
  }
}
  
  const dataSourceOptions = setDataSourceOptions();
  export const AppDataSource = new DataSource(dataSourceOptions);