import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono"
import { trpcCreateContext } from "./context";
import { trpcRouter } from "./routes/router";

interface HonoAppOptions {
    basePath: string
}

export const createHonoApp = (options: HonoAppOptions) => {
    const app = new Hono().basePath(options.basePath);

    app.onError((e, ctx) => {
        return ctx.json(e)
    })

    app.use('*',
        trpcServer({
            endpoint: '/trpc',
            onError: (err) => {
                console.error(err)
            },
            createContext: async (_opts, c) => {
                return trpcCreateContext(c);
            },
            router: trpcRouter,
        })
    )

    return app
}