import { auth } from "./firebase-sdk.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

var status = document.getElementById("status");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("openDoorSwitch")
    .addEventListener("change", function () {
      
      if (this.checked) {
        status.innerText = "A tranca está aberta";
        status.style.color = "green";
        $.ajax({
          url: "http://192.168.26.168/H",
        });
      } else {
        status.innerText = "A tranca está fechada";
        status.style.color = "red";
        $.ajax({
          url: "http://192.168.26.168/L",
        });
      }
    });

  document
    .getElementById("turnOnAirConditioningSwitch")
    .addEventListener("change", function () {
      if (this.checked) {
        status.innerText = "O ar condicionado está ligado";
        status.style.color = "green";
        $.ajax({
          url: "http://192.168.26.168/MUDAR",
        });
      } else {
        status.innerText = "O ar condicionado está desligado";
        status.style.color = "red";
        $.ajax({
          url: "http://192.168.26.168/MUDAR",
        });
      }
    });

  document
    .getElementById("turnOnLightSwitch")
    .addEventListener("change", function () {
      if (this.checked) {
        status.innerText = "A luz está ligada";
        status.style.color = "green";
        $.ajax({
          url: "http://192.168.26.168/MUDAR",
        });
      } else {
        status.innerText = "A luz está desligada";
        status.style.color = "red";
        $.ajax({
          url: "http://192.168.26.168/MUDAR",
        });
      }
    });

  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("botao").addEventListener("click", login);
  document
    .getElementById("registerButton")
    .addEventListener("click", registerAccount);

  var input = document.getElementById("pass");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      login();
    }
  });

  document
    .getElementById("flexCheckDefault")
    .addEventListener("click", showPass);
  document
    .getElementById("flexCheckDefaultCadastro")
    .addEventListener("click", showPassCadastro);
});

function registerAccount() {
  let password = document.getElementById("passCadastro").value;
  let passwordConfirm = document.getElementById("passConfirm").value;
  let email = document.getElementById("emailRegister").value;

  if (password === passwordConfirm) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Conta cadastrada com sucesso");
        $.ajax({
          url: "http://192.168.26.168/S",
        });
      })
      .catch((error) => {
        handleRegisterError(error);
      });
  } else {
    alert("As senhas não coincidem. Por favor, tente novamente.");
  }
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login realizado com sucesso");
      document.getElementById("form-login").style.display = "none";
      document.getElementById("form-controle").style.display = "block";
    })
    .catch((error) => {
      handleLoginError(error);
    });
}

function logout() {
  signOut(auth)
    .then(() => {
      alert("Logout realizado com sucesso");
      document.getElementById("form-login").style.display = "block";
      document.getElementById("form-controle").style.display = "none";
    })
    .catch((error) => {
      alert("Erro ao realizar logout!");
    });
}

function handleRegisterError(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      alert("O e-mail já está em uso. Por favor, use outro e-mail.");
      break;
    case "auth/invalid-email":
      alert(
        "O e-mail fornecido é inválido. Por favor, verifique e tente novamente."
      );
      break;
    case "auth/weak-password":
      alert("A senha é muito fraca. Por favor, use uma senha mais forte.");
      break;
    default:
      alert("Erro ao cadastrar conta! Código de erro: " + error.code);
  }
}

function handleLoginError(error) {
  switch (error.code) {
    case "auth/user-not-found":
      alert(
        "Usuário não encontrado. Por favor, verifique o e-mail e tente novamente."
      );
      break;
    case "auth/wrong-password":
      alert("Senha incorreta. Por favor, tente novamente.");
      break;
    case "auth/invalid-email":
      alert(
        "O e-mail fornecido é inválido. Por favor, verifique e tente novamente."
      );
      break;
    default:
      alert("Erro ao fazer login! Código de erro: " + error.code);
  }
}

function showPass() {
  let pass = document.getElementById("pass");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
}

function showPassCadastro() {
  let pass1 = document.getElementById("passCadastro");
  let pass2 = document.getElementById("passConfirm");
  if (pass1.type === "password" && pass2.type === "password") {
    pass1.type = "text";
    pass2.type = "text";
  } else {
    pass1.type = "password";
    pass2.type = "password";
  }
}
