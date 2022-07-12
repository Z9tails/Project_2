async function loginFormHandler(event) {
  console.log('hello there, General')
  event.preventDefault();

  console.log(document.getElementById('username'));
   console.log(document.getElementById("password"));
  const password = document.getElementById("loginpassword").value.trim();
  const username = document.getElementById("loginusername").value.trim();
   
   const loginbutton = document.getElementById('loginButton');
    const signupbutton = document.getElementById('signup');


  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // document.location.replace("/");
      loginbutton.style.display = "none";
      signupbutton.style.display = "none";
      document.getElementById("login").style.display = "none";
    } else {
      alert(response.statusText);
    }
  }
}



document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


