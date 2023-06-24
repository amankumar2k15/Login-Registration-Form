let initialObj = {
    name: null,
    email: null,
    password: null,
    repeatPassword: null,
}
// console.log(initialObj)

const handleInput = (eve) => {
    let { value, id } = eve.target;
    // console.log(eve.target.id)
    switch (id) {
        case "name":
            if (value.length > 0) {
                let nameVal = /[a-z]/
                if (value.length > 0 && value.match(nameVal)) {
                    initialObj.name = value;
                    document.getElementById('name').style.border = "rgba(0, 0, 0, 0.6)"
                    document.getElementById('your_name').style.color = "rgba(0, 0, 0, 0.6)"
                } else {
                    document.getElementById('your_name').style.color = "red"
                    initialObj.name = "";
                }
            } else {
                document.getElementById('name').style.border = "rgba(0, 0, 0, 0.6)"
            }
            break
        case "email":
            if (value.length > 0) {
                let emailVal = /[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/
                if (value.match(emailVal)) {
                    document.getElementById('your_email').style.color = "rgba(0, 0, 0, 0.6)"
                    initialObj.email = value;
                }
                else {
                    document.getElementById('your_email').style.color = "red"
                    initialObj.email = "";
                }
            } else {
                document.getElementById('your_email').style.color = "rgba(0, 0, 0, 0.6)"

            }
            break

        case "password":
            let passwordText = document.getElementById("pass_info");

            if (value.length > 2) {
                passwordText.innerHTML = ""
                let passwordVal = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@]).{8,}/
                if (value.match(passwordVal) || value.length === 0) {
                    document.getElementById('your_password').style.color = "rgba(0, 0, 0, 0.6)"
                    initialObj.password = value;
                } else if (value.length > 1 && value.length < 7) {
                    document.getElementById('your_password').style.color = "red"
                    initialObj.password = "";
                }
            } else if (value.length === 1) {
                document.getElementById('your_password').style.color = "rgba(0, 0, 0, 0.6)"
                passwordText.innerHTML = "Password must contain atleast 8 characters, one digit, one uppercase, one lowercase and @ symbol."
            }
            else if (value.length === 0) {
                passwordText.innerHTML = ""
            }

            break;

        case "repeatPassword":
            if (value.length > 0) {
                let repeat_PasswordVal = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@]).{8,}/
                if (value.match(repeat_PasswordVal)) {
                    document.getElementById('your_repeat_password').style.color = "rgba(0, 0, 0, 0.6)"
                    initialObj.repeatPassword = value;
                    if (initialObj.repeatPassword === initialObj.password) {
                        return true
                    } else {
                        document.getElementById('your_repeat_password').style.color = "red"
                        alert("Password does not match")
                    }
                } else {
                    document.getElementById('your_repeat_password').style.color = "red"
                    initialObj.repeatPassword = "";
                }
            } else {
                document.getElementById('your_repeat_password').style.color = "rgba(0, 0, 0, 0.6)"
            }
            break
        default:
            console.log("Checkbox Clicked")
    }

}

function checkPasswords() {
    if (initialObj.password === initialObj.repeatPassword) {
        return true
    } else {
        alert("Password does not match")
        return false
    }
}

const handleSubmit = () => {
    if (initialObj.name === null) {
        alert('Please Enter Your Name')
    } else if (initialObj.email === null && initialObj.password === null && initialObj.repeatPassword === null) {
        alert('Please Enter the requied fields')
    }
    else if (checkPasswords()) {
        axios.post("http://localhost:3000/user", initialObj)
            .then((res) => {
                // loginUp()
            }).catch((err) => {
                console.log(err)
            })

    }


}

// Login----------------------------------------------------------------------->
const login_obj = {
    useremail: null,
    userpassword: null
}

const handle_Login = (event) => {
    const { value, id } = event.target
    // console.log(value,id)
    switch (id) {
        case "login_email":
            login_obj.useremail = value;
            break;
        case "login_password":
            login_obj.userpassword = value;
            break;
    }
}



const getSubmitData = () => {

    axios.get("http://localhost:3000/user").then((res) => {
        let array = res.data;
        // console.log(array)
        let newarray = array.filter((val) => val.email === login_obj.useremail && val.password === login_obj.userpassword)
        console.log(newarray)
        if (newarray.length > 0) {
            alert("login")
        } else {
            alert("Invalid Credentails")
        }
    })
}



//To switch the form----------->
let reg_form = document.getElementById("registration-form")
let login_form = document.getElementById("login-form")

function signUp() {
    if (login_form.style.display != "none") {
        login_form.style.display = "none";
        reg_form.style.display = "block";
    }
}
function loginUp() {
    if (reg_form.style.display != "none") {
        reg_form.style.display = "none";
        login_form.style.display = "block";
    }
}


