import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp({
    user: "postgres",
    password: "fagote123",
    host: "localhost",
    port: 5432,
    database: "clean_architecture",
    idleTimeoutMillis: 100
});

export default db;