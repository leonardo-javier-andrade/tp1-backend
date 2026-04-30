import { getUsers, createUser, updateUser, deleteUser } from "./controllers.js"


const args = process.argv
const params = args.slice(2);
const operation = params[0];
let result;

// Parametros identificados para operaciones futuras
const username= params[1]
const email= params[2]
const password= params[3]



// regex validacion para que sean solo letras
const usernameRegex = /^[a-zA-Z]+$/

//regex validacion para password con mayuscula minuscula y numero
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/


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
    // comprobacion de longitud de username
        if (username.length < 3) {
               result = "error el username debe tener al menos 3 caracteres"
            break}
    //comprobacion de username solo letras
        if (!usernameRegex.test(username)) {
               result = "error el username debe contener solo letras"
            break}
    // comprobacion de email con dominio gmail
        if(!email.endsWith("@gmail.com")){
                result = "error el email debe ser de gmail"
            break}
    // comprobacion de longitud de password
        if(password.length < 6){
                result = "error la contraseña debe tener al menos 6 caracteres"
            break}
    // comprobacion de password con mayuscula, minuscula y numero
        if(!passwordRegex.test(password)){
                result = "error la contraseña debe incluir al menos una Mayuscula y un Número"
            break}
  
    // Validados los datos se procede a la creación del usuario
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

    // se ejecuta el programa y muestra el resultado dependiendo la operacion
  console.log(result)

  // cierra el proceso para devolver el control de la terminal
  process.exit(0)
}

main()