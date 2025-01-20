import { initTRPC } from "@trpc/server";
import superjson from 'superjson'
import type { TContextTrpc } from "./types/context.type";

export const trpcApp = initTRPC.context<TContextTrpc>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
        };
    },
});
