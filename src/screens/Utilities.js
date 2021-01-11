
export default class Utilities {
    constructor(props) {
    }

    validateEmail(email) {
        console.log("Original Email id = " + email);
        const expression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        email = String(email).toLowerCase().replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
            replace(/[ ]{2,}/gi, " ").       // replaces multiple spaces with one space
            replace(/\n +/, "\n");
        console.log("value after trimming", email);
        if (email.includes('fbrn')) {
            return false;
        }
        if (email.substr(email.lastIndexOf('@') + 1, email.lastIndexOf('.')).length == 0) {
            return false;
        }
        return expression.test(email);
    }

    _signup(email, password) {
        fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers:{ 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // If server response message same as Data Matched
                if (responseJson.token ) {
                    return responseJson.token
                } else {
                    return false
                }  
            })
            .catch((error) => {
                //print error
                console.error(error);
                return false
            });

    }

    
}