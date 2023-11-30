import AuthService from "./auth.service.ts";

export default class SleepYunukiService {
  private static readonly apiUrl = "http://localhost:3000";

  static async feedYunuki() {
    const res = await fetch(this.apiUrl + "/yunukis/sleep", {
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
