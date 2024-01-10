import AuthService from "../../auth/services/auth.service.ts";

// Este servicio nos permitirá conectar con las rutas dispuestas por la API relacionadas con la interfaz de cuidado de los yunukis. Usamos AuthService para poder firmar la autorización con el JWT. Por lo demás, el funcionamiento de los métodos es muy similar al que ya se explica en detalle en auth.service.ts, con la diferencia de que los errores que se esperan desde el servidor tienen que ver con errores 404, de tipo "no encontrado".
export default class YunukiService {
  private static readonly apiUrl = "http://localhost:3000";

  static async getYunuki() {
    const res = await fetch(this.apiUrl + "/yunukis/get", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
    if (res.status === 404) {
      throw new Error("Yunuki no encontrado");
    }
    const yunuki = await res.json();
    return yunuki;
  }

  static async getDeadYunukis() {
    const res = await fetch(this.apiUrl + "/yunukis/get-dead", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
    if (res.status === 404) {
      throw new Error("Ningún Yunuki fallecido encontrado");
    }
    const deadYunuki = await res.json();
    return deadYunuki;
  }

  static async feedYunuki() {
    const res = await fetch(this.apiUrl + "/yunukis/feed", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });

    const yunuki = await res.json();
    return yunuki;
  }

  static async cleanYunuki() {
    const res = await fetch(this.apiUrl + "/yunukis/clean", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });

    const yunuki = await res.json();
    return yunuki;
  }

  static async sleepYunuki() {
    const res = await fetch(this.apiUrl + "/yunukis/sleep", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });

    const yunuki = await res.json();
    return yunuki;
  }
}
