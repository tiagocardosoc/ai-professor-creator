import { trpcApp } from "../trpc";

export const trpcRouter = trpcApp.router({
});

export type AppRouter = typeof trpcRouter;