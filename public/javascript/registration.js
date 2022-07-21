const loginbutton = document.getElementById("loginButton");
const signupbutton = document.getElementById("newacc");
const createbutton = document.getElementById("signup");
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(username, password);
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      loginAfterRegister(username, password);
    } else {
      alert(response.statusText);
    }
  }
}
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

async function loginAfterRegister(username, password) {
  if (username && password) {
    console.log(password);
    const response = await fetch("/api/users/login", {
      method: "POST",
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
      createbutton.style.display = "none";
      document.getElementById("login").style.display = "none";
    } else {
      alert(response.statusText);
    }
  }
}
