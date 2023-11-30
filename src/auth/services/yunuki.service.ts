import AuthService from "./auth.service.ts";

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
      return res;
    }
    const yunuki = await res.json();
    return yunuki;
  }

  static async feedYunuki() {
    await fetch(this.apiUrl + "/yunukis/feed", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
  }

  static async cleanYunuki() {
    await fetch(this.apiUrl + "/yunukis/clean", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
  }

  static async sleepYunuki() {
    await fetch(this.apiUrl + "/yunukis/sleep", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + AuthService.getJwt(),
        "Content-Type": "application/json",
      },
    });
  }
}
