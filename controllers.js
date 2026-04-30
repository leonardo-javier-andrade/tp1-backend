import { db } from "./config.js";
import { randomUUID } from "crypto";

const getUsers = async () => {
  const q = `SELECT * FROM users`
  const [response] = await db.query(q)
  return response
}

const createUser = async (username, email, password) => {
    const newUser = { 
        id: randomUUID(),
        username : username, 
        email: email,
        password: password }
        return newUser
}

const updateUser = async () => {
    return "Usuario actualizado"
}

const deleteUser = async (id) => {
    return `Usuario con id ${id} eliminado`
}

export { getUsers, createUser, updateUser, deleteUser }