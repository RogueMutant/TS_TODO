declare var axios: any;
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const switchBtn = document.getElementById("switchBtn");
const modalAuth = document.querySelector(".modal") as HTMLDivElement;
const modalParaEl = document.querySelector(".modalPara") as HTMLDivElement;
const signupEmailEl = document.getElementById(
  "signupEmail"
) as HTMLInputElement;
const loginEmailEl: HTMLInputElement | null = document.getElementById(
  "loginEmail"
) as HTMLInputElement;
const usernameEl: HTMLInputElement | null = document.getElementById(
  "signupUsername"
) as HTMLInputElement;
const buttons = Array.from(
  document.querySelectorAll<HTMLButtonElement>(".auth-btn")
);
const [loginBtn, signupBtn] = buttons;

document.addEventListener("DOMContentLoaded", () => {
  const toggleForms = () => {
    if (loginForm?.classList.contains("active")) {
      loginForm.classList.remove("active");
      signupForm?.classList.add("active");
      switchBtn!.textContent = "Switch to Login";
      console.log("signUP");
    } else {
      signupForm?.classList.remove("active");
      loginForm?.classList.add("active");
      switchBtn!.textContent = "Switch to Sign Up";
      console.log("login");
    }
  };

  switchBtn?.addEventListener("click", toggleForms);

  // Initialize with login form visible
  loginForm?.classList.add("active");
});

const showCountdown = (seconds: number, text: string) => {
  let counter = seconds;

  const intervalId = setInterval(() => {
    counter -= 1;
    modalParaEl.textContent = `${text} ${counter}...`;
    if (counter < 0) {
      clearInterval(intervalId);
      modalAuth.classList.toggle("slidedown");
      window.location.href = "./home.html";
    }
  }, 1000);
};

if (signupBtn) {
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!usernameEl || !signupEmailEl) {
      console.log("username or signup element does not exist");
      return;
    }
    const name: string = usernameEl.value;
    const email: string = signupEmailEl.value;

    if (!name || !email) {
      alert("Email or username cannot be empty!");
      console.log(name, email);

      return;
    }
    try {
      const response = await axios.post("/home/auth/register", {
        name,
        email,
      });
      showCountdown(3, "redirecting in");
      modalAuth.classList.toggle("slidedown");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!loginEmailEl) {
      console.log("ELement not found");
      return;
    }
    const email: string = loginEmailEl.value;
    if (!email) {
      alert("Email cannot be empty!");
      return;
    }
    try {
      const { data } = await axios.post("/home/auth/login", {
        email,
      });
      showCountdown(3, `welcome back ${data.name}, redirecting in`);
      modalAuth.classList.toggle("slidedown");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}
