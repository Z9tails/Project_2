async function loginFormHandler(event) {
  
  event.preventDefault();
console.log('hello there, General')
  const password = document.querySelector("#password-login").value.trim();
  const username = document.querySelector("#user-login").value.trim();

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
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}



document.querySelector('.login-form').addEventListener('submit', loginFormHandler);


