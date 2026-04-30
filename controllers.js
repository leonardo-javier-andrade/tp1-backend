import { db } from "./config.js";

const getUsers = async () => {
return "lista de usuarios"}

const createUser = async (username, email, password) => {
    const newUser = { username : username, 
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