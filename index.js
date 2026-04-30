import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"


const args = process.argv
const params = args.slice(2);
const operation = params[0];
let result;


const username= params[1]
const email= params[2]
const password= params[3]

// if (!username || !email || !password) {
//   console.log("Error: Faltan parámetros. Se requieren username, email y password.")}
  

switch (operation) {
  case "get":
    result = await getUsers()
    break
  case "add":
    // createUser("username", "email", "password")
    result = await createUser(username, email, password)
    break
  case "update":
    result = await updateUser()
    break
  case "delete":
    result = await deleteUser(params[1])
    break
  default:
    result =  "Operación invalida."
}

const main = () => {
  console.log(result)
}

main()