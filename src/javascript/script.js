const form = document.querySelector("#form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    {
      id: 'name',
      label: 'Nome',
      validator: nameIsValid
    },
    {
      id: 'last_name',
      label: 'Sobrenome',
      validator: nameIsValid
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
    validator.errorMenssage = `Deve ter no mínimo ${min} caracteres.`;
    return validator;
  }
  const regex = /^[a-zA-Z]/;
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMenssage = "o campo deve ter conter apenas letras!";
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
