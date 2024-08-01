const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
const loginForm = document.getElementById("loginForm") as HTMLDivElement;
const signupForm = document.getElementById("signupForm") as HTMLDivElement;

if (toggleBtn && loginForm && signupForm) {
  toggleBtn.addEventListener("click", () => {
    if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      toggleBtn.textContent = "Switch to Signup";
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      toggleBtn.textContent = "Switch to Login";
    }
  });

  // Initialize with login form visible
  loginForm.style.display = "block";
  signupForm.style.display = "none";
}
console.log("hello world");
