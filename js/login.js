let username = document.querySelector("#username")
let password = document.querySelector("#pswd")
let signinBtn = document.querySelector("#sign_in")

let getUsername = localStorage.getItem("username")
let getPassword = localStorage.getItem("password")

signinBtn.addEventListener("click", function(e){
    e.preventDefault();
    if(username.value === "" || password.value === ""){
        alert("Please fill in data")
    }else{
        if(getUsername && getUsername.trim() === username.value.trim() && getPassword && getPassword.trim() === password.value){
            setTimeout( () => {
                window.location = "index.html"
            }, 1500)
        }else{
            alert("username or password is wrong")
        }
    }
})