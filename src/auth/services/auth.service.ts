export default class AuthService {
  private static readonly apiUrl = "http://localhost:3000"; //ruta para conectar con la API
  private static readonly jwtKey = "yunuki-jwt"; // clave para el almacenamiento local donde se guardará el token

  static async login(username: string, password: string) {
    // 'res' va a contener finalmente el token devuelto por la API, si es que el proceso ha ido correctamente
    const res = await fetch(this.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // el cuerpo de la solicitud que se está enviando(contiene los valores introducidos, en formato JSON)
        username,
        password,
      }),
    });

    if (res.status === 200) {
      const json = await res.json();
      this.saveJwt(json.access_token);
      return true;
    }
    return false;
  }

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
    if(result.status === 201){
      return true;
    } else {
      return false;
    }
  }

  static getJwt() {
    localStorage.getItem(this.jwtKey);
  }

  private static saveJwt(jwt: string) {
    localStorage.setItem(this.jwtKey, jwt);
  }

  private static deleteJwt(jwt: string) {
    localStorage.removeItem(this.jwtKey);
  }
}
