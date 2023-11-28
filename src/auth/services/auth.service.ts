export default class AuthService {
  private static readonly apiUrl = "http://localhost:3000";
  private static readonly jwtKey = "yunuki-jwt";

  static async login(username: string, password: string) {
    const res = await fetch(this.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
    if (result.status === 201) {
      return true;
    } else {
      return false;
    }
  }

  static async getUser() {
    const result = await fetch(this.apiUrl + "/users/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });

    return await result.json();
  }

  static getJwt() {
    return localStorage.getItem(this.jwtKey);
  }

  private static saveJwt(jwt: string) {
    localStorage.setItem(this.jwtKey, jwt);
  }

  private static deleteJwt(jwt: string) {
    localStorage.removeItem(this.jwtKey);
  }
}
