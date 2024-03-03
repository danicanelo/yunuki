import AuthService from "../../auth/services/auth.service.ts";

export default class YunukiService {
  private static readonly apiUrl = "http://localhost:3000";

  static async createYunuki(name: string, breed: number) {
    const result = await fetch(this.apiUrl + "/yunukis/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        breed,
      }),
    });
    if (result.status === 201) {
      return true;
    } else {
      return false;
    }
  }

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

  static async getBreeds() {
    const result = await fetch(this.apiUrl + "/breed/get", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
    return await result.json();
  }
}
