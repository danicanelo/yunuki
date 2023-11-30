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
    const yunuki = await res.json();
    return yunuki;
  }
}
