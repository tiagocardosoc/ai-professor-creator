import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";
import { trpcApp } from "./trpc";

export const publicProcedure = trpcApp.procedure;

export const privateProcedure = trpcApp.procedure.use(isAuthenticated)