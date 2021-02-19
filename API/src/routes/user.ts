/* 
    localhost:3000/user/..
*/
import UserController from "../controller/UserController"
import { Router } from "express"
import { checkJwt } from "../middlewares/jwt"
import { checkRole } from "../middlewares/role"

const router = Router()

// Get all users
router.get("/", [checkJwt, checkRole(["ADMIN_ROLE"])], UserController.getAll)

// Get one user
router.get(
  "/:id",
  [checkJwt, checkRole(["ADMIN_ROLE"])],
  UserController.getById
)

// Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN_ROLE"])], UserController.newUser)

// Edit user
router.patch(
  "/:id",
  [checkJwt, checkRole(["ADMIN_ROLE"])],
  UserController.editUser
)

// Delete user
router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN_ROLE"])],
  UserController.deleteUser
)

export default router
