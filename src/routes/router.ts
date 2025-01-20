import { trpcApp } from "../trpc";
import { authRouter } from "./auth.router";

export const trpcRouter = trpcApp.router({
    authRouter,
});

export type AppRouter = typeof trpcRouter;