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

    const q = `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`

    const [response] = await db.query(q, [crypto.randomUUID(), username, email, password])

    if (response.serverStatus === 2) {
    return {
    Mensaje : "Usuario creado con éxito.",
    Datos : newUser
  }

    }}

const updateUser = async (id, updates) => {
   try {
    const q = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    const { username, email, password } = updates;
    const [response] = await db.query(q, [username, email, password, id])

    if (response.affectedRows > 0) {
    return "Usuario actualizado exitosamente";}
    
    if(response.affectedRows === 0) {
        return "No se encontró el usuario con el ID Nro : " + id + " proporcionado."
    }
     
    } catch (error) {
        return "Error al actualizar el usuario: "
    }}

const deleteUser = async (id) => {
    try {
        const q = `DELETE from users WHERE id = ?;`
        const [response] = await db.query(q, [id]);
// Verificar si se eliminna o no usuario desde la Base de Datos
        if (response.affectedRows === 0) {
            return "No se encontró el usuario con el ID Nro : " + id + " proporcionado."
        }
         if (response.affectedRows > 0) {
        return "Usuario eliminado"

      }
    } catch (error) {
        return "Error al eliminar el usuario: "
    }
}

export { getUsers, createUser, updateUser, deleteUser}