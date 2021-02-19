import { Router } from "express"
import auth from "./auth"
import user from "./user"

const routes = Router()

// localhost:3000/auth/...
routes.use("/auth", auth)
// localhost:3000/user/...
routes.use("/users", user)

export default routes
