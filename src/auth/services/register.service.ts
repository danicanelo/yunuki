export default class RegisterService {
  private static readonly apiUrl = "http://localhost:3000";

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
    if(result.status === 201){
      return true;
    } else {
      return false;
    }
  }
}
