export default class AuthService {
  private static readonly apiUrl = "http://localhost:3000";
  private static readonly yunukiJwt = "yunuki-jwt"; // clave para el almacenamiento local donde se guardará el token

  static async login(username: string, password: string) {
    const res = await fetch(this.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ //el cuerpo de la solicitud que se enviará (contendrá los valores introducidos, en formato JSON)
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

  static getJwt() {
    localStorage.getItem(this.yunukiJwt);
  }

  private static saveJwt(jwt: string) {
    localStorage.setItem(this.yunukiJwt, jwt);
  }

  private static deleteJwt(jwt: string) {
    localStorage.removeItem(this.yunukiJwt);
  }
}
