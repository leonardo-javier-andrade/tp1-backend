import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"


const args = process.argv
const params = args.slice(2);
const operation = params[0];
let result;

// Parametros identificados para operaciones futuras
const username= params[1]
const email= params[2]
const password= params[3]
let errorvalidation


// regex validacion para que sean solo letras
const usernameRegex = /^[a-zA-Z]+$/

//regex validacion para password con mayuscula minuscula y numero
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

//Funcion para comprobar datos validos

const comprobacionDatos = () => {
        // comprobacion de longitud de username
        if (username.length < 3) {
               return "error el username debe tener al menos 3 caracteres"
            }
    //comprobacion de username solo letras
        if (!usernameRegex.test(username)) {
               return "error el username debe contener solo letras"
            }
    // comprobacion de email con dominio gmail
        if(!email.endsWith("@gmail.com")){
                return "error el email debe ser de gmail"
            }
    // comprobacion de longitud de password
        if(password.length < 6){
                return "error la contraseña debe tener al menos 6 caracteres"
            }
    // comprobacion de password con mayuscula, minuscula y numero
        if(!passwordRegex.test(password)){
                return "error la contraseña debe incluir al menos una Mayuscula y un Número"
            }
        }


// Operaciones acorde a los parametros ingresados

switch (operation) {
  case "get":
    result = await getUsers()
    break
  case "add":

    //Comprobación de parámetros para la operación "add" requiere todos los valores
        if (!username || !email || !password) {
               result = "error faltan datos para la creacion de usuario"
            break}
// comprobacion de dato validos

errorvalidation = comprobacionDatos()
if (errorvalidation) {
    result = errorvalidation
    break
}
  
    // Validados los datos se procede a la creación del usuario
    result = await createUser(username, email, password)
    break

  case "update":
    // verificacion de Id para actualizar usuario
     if (!params[4]){
         result = "error falta el id para actualizar el usuario"
        break  }
    // comprobacion de dato validos

  // comprobacion de dato validos

errorvalidation = comprobacionDatos()
if (errorvalidation) {
    result = errorvalidation
    break
}

        const updates = { username: username, email: email, password: password }
        result = await updateUser(params[4], updates)
        break

  
   case "delete":
    // Verficacion de datos necesarios para eliminar un usuario "ID"
            if (params[1] === undefined) {
               result = "error falta el id para eliminar el usuario"
            break}  
    result = await deleteUser(params[1])
    break
  default:
    result =  "Operación invalida."
}

const main = () => {

    // se ejecuta el programa y muestra el resultado dependiendo la operacion
  console.log(result)

  // cierra el proceso para devolver el control de la terminal
  process.exit(0)
}

main()