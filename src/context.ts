import type { Context } from "hono";
import { SecurityService } from "./services/security.service";
import type { TContextTrpc } from "./types/context.type";

export function trpcCreateContext(ctx: Context): TContextTrpc {
    const { req } = ctx;

    let user: TContextTrpc = {} as TContextTrpc;

    const authHeader = req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (token) {
        try {
            const verifiedToken = SecurityService.verifyToken(token);

            if (verifiedToken && typeof verifiedToken === "object") {
                user = verifiedToken as TContextTrpc;
            } else {
                console.error("Token verificado não é um objeto válido.");
                user = {} as TContextTrpc;
            }
        } catch (error) {
            console.error("Erro ao verificar o token:", error);
            user = {} as TContextTrpc;
        }
    }

    return user;  // Nunca retorna null
}

export type trpcContext = Awaited<ReturnType<typeof trpcCreateContext>>;
