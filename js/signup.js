let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#pswd")
let signupBtn = document.querySelector("#sign_up")
//يعمل اتشيك علي المعلومات اللي كتبتهاsignup عايزه اقول اول ما اضغط علي ال
signupBtn.addEventListener("click", function(e){
    e.preventDefault()
    if(username.value === "" || email.value === "" || password.value === ""){
        alert("Please fill in data")
    }else{
        localStorage.setItem("username" , username.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value);

        setTimeout( () => {
            window.location = "login.html"
        }, 1500)
    }
})
