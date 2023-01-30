class SecurityUtils {
    static checkAccessToken() {
        console.log('+++ token_check called');

        const res = new Promise((resolve, reject) => {
            console.log('+++ oken_check Promise started');
            let token = localStorage.getItem("access_token")
            let exp = JSON.parse(atob(token.split('.')[1])).exp
            if (-exp * 1000 < Date.now()) {
                console.log("expired!!")
                return fetch('http://127.0.0.1:5000/refresh', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("refresh_token"),
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                })
                    .then(response => {
                        if (response.status >= 400) {
                            throw new Error('Failed to refresh token, code ' + response.status);
                        } else {
                            return response;
                        }
                    })
                    .then(resp => resp.json())
                    .then(json => {
                        console.log('+++ token_check: new tokens loaded resolvoing promise');
                        console.log(JSON.stringify(json));
                        localStorage.setItem('access_token', json.access_token);
                        resolve();
                    })
                    .catch(e => {
                        console.log('+++ unable: ' + e);
                        localStorage.clear()
                        reject(e);
                        
                    });
            } else {
                console.log("token is valid!!")
                console.log('+++ token_check: tokens valid, instantly resolvoing promise');
                resolve();
            }
        });
        console.log('+++ token_check returned');
        return res;
    }
}

export default SecurityUtils;