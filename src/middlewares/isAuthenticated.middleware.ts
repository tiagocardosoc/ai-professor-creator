import { TRPCError } from "@trpc/server";
import { trpcApp } from "../trpc";

export const isAuthenticated = trpcApp.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
        });
    }
    return next();
});