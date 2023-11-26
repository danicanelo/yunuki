export default class YunukiService {
  private static readonly apiUrl = "http://localhost:3000"; //ruta para conectar con la API

  static async getYunuki(username: string) {
    const res = await fetch(this.apiUrl + "/yunukis/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }
}
