import jwt from "jsonwebtoken";
import type { TContextTrpc } from "../types/context.type";

export class SecurityService {
    private static SECRET_KEY = process.env.JWT_SECRET || "meu_segredo_super_secreto";
    private static EXPIRES_IN = "24h";

    static generateToken(payload: object) {
        return jwt.sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN });
    }

    static decodeToken(token: string): TContextTrpc | null {
        try {
            return jwt.decode(token, { complete: true })?.payload as TContextTrpc;
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    }

    static verifyToken(token: string): TContextTrpc | null {
        try {
            return jwt.verify(token, this.SECRET_KEY, { complete: true }).payload as TContextTrpc;
        } catch (error) {
            console.error("Token inválido ou expirado:", error);
            return null;
        }
    }
}