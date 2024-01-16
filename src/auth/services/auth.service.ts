// Este fichero será el encargado de conectar con nuestra API mediante los endpoints que ésta disponga. Para ello creamos la clase AuthService. Establecemos todos los métodos de esta clase como estáticos de manera que no sean necesarias instancias diferentes de la clase para ser usados.

export default class AuthService {
  // Almacenamos la ruta de la API con la que vamos a conectar
  private static readonly apiUrl = "http://localhost:3000";
  // Almacenamos el nombre del campo que contendrá el valor del token JWT asociado al usuario (en el back se explica en detalle el objetivo y funcionamiento del JWT)
  private static readonly jwtKey = "yunuki-jwt";

  // A la función que se encarga de ejecutar el login se le pasan un username y un password
  static async login(username: string, password: string) {
    // Usamos fetch para realizar la solicitud HTTP, indicando primero la url sobre la que debe actuar, y segundo un objeto con tres campos: el método con el que se hace la solicitud (POST en nuestro caso ya que queremos enviar datos), el encabezado y el cuerpo de la solicitud, que en este caso son los valores para username y password convertidos a formato JSON mediante JSON.stringify. Almacenamos la respuesta
    const result = await fetch(this.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Si el status resultante en la respuesta del servidor es 200 (que significa que todo ha ido correctamente) convertimos el resultado en un json del que poder extraer el access_token para almacenarlo en el navegador del usuario mediante el método saveJwt establecido más abajo, tras lo cual devolvemos true y la función termina. De lo contrario devolvemos false.
    if (result.status === 200) {
      const json = await result.json();
      this.saveJwt(json.access_token);
      return true;
    }
    return false;
  }

  // La función register funciona de manera similar a login, añadiendo un email a los parámetros. Devolvemos la respuesta completa del servidor.
  static async register(username: string, email: string, password: string) {
    const result = await fetch(this.apiUrl + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    return result;
  }

  // getUser no recibe ningún parámetro dado que su función es obtener el usuario conectado en el momento de su invocación, por el mismo motivo su método es GET y no POST
  static async getUser() {
    const result = await fetch(this.apiUrl + "/users/me", {
      method: "GET",
      // En los encabezados incluimos la autorización, que consta de la palabra literal Bearer seguida de un espacio y el JWT almacenado en el navegador del usuario y obtenido mediante getJwt, establecido más abajo
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
    // Si el status de la respuesta es 401 (que significa que la petición no ha sido autorizada) lanzamos un error
    if (result.status === 401) {
      throw new Error();
    }
    // Convertimos la respuesta a formato JSON y la devolvemos
    return await result.json();
  }

  // Método para obtener el JWT almacenado en el navegador
  static getJwt() {
    return localStorage.getItem(this.jwtKey);
  }

  // Método para almacenar en el navegador el JWT retornado por el servidor, utiliza ese JWT + el valor establecido en jwtKey que actuará como nombre de la clave en el par clave-valor resultante
  private static saveJwt(jwt: string) {
    localStorage.setItem(this.jwtKey, jwt);
  }

  // Método para eliminar un JWT del navegador, se utiliza en el momento en el que un usuario clica en Cerrar Sesión
  static deleteJwt(jwt: string) {
    localStorage.removeItem(this.jwtKey);
  }
}
