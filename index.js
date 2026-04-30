import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"


const args = process.argv
const params = args.slice(2);
const operation = params[0];
let result;


const username= params[1]
const email= params[2]
const password= params[3]



// regex validacion para que sean solo letras
const usernameRegex = /^[a-zA-Z]+$/

//regex validacion para password con mayuscula minuscula y numero
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

// if (!username || !email || !password) {
//   console.log("Error: Faltan parámetros. Se requieren username, email y password.")}
  

switch (operation) {
  case "get":
    result = await getUsers()
    break
  case "add":

    //Comprobación de parámetros para la operación "add" requiere todos los valores
        if (!username || !email || !password) {
               result = "error faltan datos para la creacion de usuario"
            break}
        if (username.length < 3) {
               result = "error el username debe tener al menos 3 caracteres"
            break}
        if (!usernameRegex.test(username)) {
               result = "error el username debe contener solo letras"
            break}

        if(!email.endsWith("@gmail.com")){
                result = "error el email debe ser de gmail"
            break}
        if(password.length < 6){
                result = "error la contraseña debe tener al menos 6 caracteres"
            break}
        if(!passwordRegex.test(password)){
                result = "error la contraseña debe incluir al menos una Mayuscula y un Número"
            break}
  
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