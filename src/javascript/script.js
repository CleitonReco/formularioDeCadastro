const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    {
      id: "name",
      label: "Nome",
      validator: nameIsValid,
    },
    {
      id: "last_name",
      label: "Sobrenome",
      validator: nameIsValid,
    },
    {
      id: "birthdate",
      label: "Nascimento",
      validator: dateIsValid,
    },
    {
      id: "email",
      label: "E-mail",
      validator: emailIsValid,
    },
  ];

  const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    const inputBox = input.closest(".input-box");
    const inputValue = input.value;
    const errorSpan = inputBox.querySelector(".error");
    errorSpan.innerHTML = "";

    inputBox.classList.remove("invalid");
    inputBox.classList.add("valid");

    const fieldValidator = field.validator(inputValue);
    if (!fieldValidator.isValid) {
      errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMenssage}`;
      inputBox.classList.add("invalid");
      inputBox.classList.remove("valid");
      return;
    }
  });
});

function isEmpty(value) {
  return value === "";
}

function nameIsValid(value) {
  const validator = {
    isValid: true,
    errorMenssage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMenssage = "O campo é obrigatório.";
    return validator;
  }
  const min = 3;

  if (value.length < min) {
    validator.isValid = false;
    validator.errorMenssage = `Deve ter no mínimo ${min} caracteres!`;
    return validator;
  }
  const regex = /^[a-zA-Z]/;
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMenssage = "o campo deve ter conter apenas letras!";
  }
  return validator;
}

function dateIsValid(value) {
  const validator = {
    isValid: true,
    errorMenssage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMenssage = "O nascimento é obrigatório!";
    return validator;
  }

  const year = new Date(value).getFullYear();

  if (year < 1920 || year > new Date().getFullYear()) {
    validator.isValid = false;
    validator.errorMenssage = "Data inválida!";
    return validator;
  }
  return validator;
}

function emailIsValid(value) {
  const validator = {
    isValid: true,
    errorMenssage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMenssage = "O e-mail é obrigatório!";
    return validator;
  }
  const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMenssage = "O e-mail precisa ser válido!";
    return validator;
  }
  return validator;
}

const passwordIcons = document.querySelectorAll(".password-icon");

passwordIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    const input = this.parentElement.querySelector(".form-control");

    input.type = input.type === "password" ? "text" : "password";

    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
});
