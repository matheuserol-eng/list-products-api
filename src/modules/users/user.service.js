
import { env } from "../../config/env"
import { HttpError } from "../../utils/httpError"
import { makeUserRepoMemory } from "./user.repo.memory"

export const makeUserService = () => {
    const repo = makeUserRepoMemory()

    const register = async ({ name, email, password }) => {
        const exists = await repo.findByEmail(email)

        if (exists) {
            throw new HttpError("Enauk already to use", 409, "EMAIL_TAKEN")
        }

        const passwordHash = await bcrypt.hash(password, 10)

        return repo.create({ name, email, passwordHash })
    }

    const login = async ({ email, password }) => {
        const user = await repo.findByEmail(email)

        if (!user) {
            throw new HttpError("User hnot found", 404, "USER_NOT_FOUND")
        }

        const ok = await bcrypt.compare(password, user.passwordHash)

        if (!ok) {
            throw new HttpError("Invalid credentials", 401, "INVALID_CREDENTIALS")
        }

        const accessToken = jwt.sign({}, env.jwtSecret, {
            subject: String(user.id),
            expiresIn: env.jwtExpiresIn
        })

        return { accessToken }
    }

    return { register, login }
}