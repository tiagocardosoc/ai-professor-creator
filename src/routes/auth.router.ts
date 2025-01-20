import { trpcApp } from "../trpc";
import { signIn } from "./procedures/auth/signIn.procedure";
import { signUp } from "./procedures/auth/signUp.procedure";

export const authRouter = trpcApp.router({
    signIn,
    signUp
})