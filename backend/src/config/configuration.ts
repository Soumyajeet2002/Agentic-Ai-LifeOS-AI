export default () => ({
  app: {
    name: process.env.APP_NAME ?? 'LifeOS Backend',
    environment: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3001),
    apiPrefix: process.env.API_PREFIX ?? 'api/v1',
  },

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'soumyajeet',
    database: process.env.DB_DATABASE ?? 'lifeos',
  },
});