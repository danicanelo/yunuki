import AuthService from "./auth.service.ts";

export default class createYunukiService {
  private static readonly apiUrl = "http://localhost:3000"; //ruta para conectar con la API

  static async createYunuki(name: string, color: string, breed: string) {
    const result = await fetch(this.apiUrl + "/yunukis/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        color,
        breed,
      }),
    });
    if (result.status === 201) {
      return true;
    } else {
      return false;
    }
  }
}
