import { AppDataSource } from "./config/database/appDataSource";
import { createHonoApp } from "./hono";

const app = createHonoApp({
    basePath: '/api'
})


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));

export default {
    port: 3000,
    fetch: app.fetch
}