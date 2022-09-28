// node_modules imports
import { Router } from "express";
import AuthUserService from "../services/AuthUserService";

const sessionRouter = Router();

sessionRouter.get("/", async (_, res) => {
    res.send("<h1>Response</h1>");
});
// NOTE: root path "/" is relative to "/" in routes
sessionRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        const authorizeUser = new AuthUserService();
        const { user, token } = await authorizeUser.run({
            email,
            password,
        });
        delete user.password;

        return res.status(200).json({ user, token });
    } catch (err: unknown) {
        return res.status(400).json({ error: err.message });
    }
});

export default sessionRouter;