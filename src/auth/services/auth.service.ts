export default class AuthService{
    private static readonly apiUrl = "http://localhost:3000";

    static login(username: string, password: string){
        fetch(this.apiUrl + "/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, 
                password
            })
        })
    }
}