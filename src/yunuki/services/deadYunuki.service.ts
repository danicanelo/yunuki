import AuthService from "../../auth/services/auth.service.ts";

export default class DeadYunukiService {
  private static readonly apiUrl = "http://localhost:3000";

  static async getDeadYunukis() {
    const res = await fetch(this.apiUrl + "/dead-yunukis/get", {
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
}
