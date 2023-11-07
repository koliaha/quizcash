// navigation.js
document.addEventListener("DOMContentLoaded", function () {
  var pages = [
    // "index.html", // index 0
    "form.html", // index 1
    "card.html", // index 3
    "quiz.html", // index 4
    "permissions.html", // index 5
    "registration.html", // index 6
    "survey.html", // index 7
    "tabs.html", // index 8
    "tomorrow.html", // index 9
    "withdrawal.html", // index 10
    "loader.html", // index 11
  ];
  document.addEventListener("DOMContentLoaded", (event) => {
    // setCurrentPageCookie();
  });
  // function setCurrentPageCookie() {
  //   // Ensure the 'pages' array is defined and has content
  //   if (!Array.isArray(pages) || pages.length === 0) {
  //     console.error("The 'pages' array is not properly defined.");
  //     return;
  //   }

  //   var currentPage = window.location.href.split("./").pop();
  //   var pageIndex = pages.indexOf(currentPage);
  //   if (pageIndex === -1) {
  //     console.error("Current page is not in the 'pages' array.");
  //     return;
  //   }

  //   setCookie('lastPageIndex', pageIndex, 7);
  // }
  function openPage(index) {
    if (index >= 0 && index < pages.length) {
      // Set a cookie to last for, e.g., 7 days
      setCookie("lastPageIndex", index, 7);
      window.location.href = pages[index];
    } else {
      console.error("Index out of bounds");
    }
  }

  // if (withdrawal) {
  //   window.location.href = "./withdrawal.html";
  //   return;
  // } else if (card) {
  //   window.location.href = "./card.html";
  //   return;
  // } else if (validsms && validphone) {
  //   window.location.href = "./quiz.html";
  //   return;
  // } else if (!validsms && !validphone) {
  //   window.location.href = "./";
  //   return;
  // } else {
  //   window.location.href = "/";
  //   return;
  // }

  // if (validsms && validphone) {
  //   window.location.href = "./quiz.html";
  // } else {
  //   window.location.href = "./registration.html";
  // }
  // if (window.location.pathname.endsWith("./registration.html")) {
  //   const cookval = getCookie("validphone");
  //   if (cookval === "true") {
  //     window.location.href = "./permissions.html";
  //   }
  // }
  // if (window.location.pathname.endsWith("./permissions.html")) {
  //   const cookval = getCookie("validsms");
  //   if (cookval === "true") {
  //     window.location.href = "./quiz.html";
  //   }
  // }
  // if (window.location.pathname.endsWith("./quiz.html")) {
  //   const cookval = getCookie("quized");
  //   if (cookval === "true") {
  //     window.location.href = "./survey.html";
  //   }
  // }
  // if (window.location.pathname.endsWith("./card.html")) {
  //   const cookval = getCookie("card");
  //   if (cookval === "true") {
  //     window.location.href = "./form.html";
  //   }
  // }
  // if (
  //   window.location.pathname === "/" ||
  //   window.location.pathname.endsWith("./home.php")
  // ) {
  //   const cookval = getCookie("withdrawal");
  //   if (cookval === "true") {
  //     window.location.href = "./withdrawal.html";
  //   }
  // }
  // setCookie("withdrawal", true, 7);
  function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  function setCookie(name, value, daysToLive) {
    var date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie =
      name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
  }

  function redirectToAppropriatePage() {
    var currentPage = getCurrentPageName();
    if (currentPage === "form.html" || currentPage === "tomorrow.html") {
      return;
    }
    function getCurrentPageName() {
      var parser = new URL(window.location.href);
      return parser.pathname.split("/").pop(); // Get the last part of the path
    }

    function redirectIfNotCurrent(targetPageName) {
      var currentPageName = getCurrentPageName();
      if (currentPageName !== targetPageName) {
        window.location.href = targetPageName;
      }
    }
    const withdrawal = getCookie("withdrawal") === "true";
    if (withdrawal) {
      redirectIfNotCurrent("withdrawal.html");
      return; 
    }
    const card = getCookie("card") === "true";

    if (card) {
      redirectIfNotCurrent("card.html");
      return; 
    }

    const validphone = getCookie("validphone") === "true";
    const validsms = getCookie("validsms") === "true";
    const quizCompleted = getCookie("quizCompleted") === "true";
    const surveyCompleted = getCookie("surveyCompleted") === "true";

    if (validphone && validsms && !quizCompleted) {
      redirectIfNotCurrent("quiz.html");
    } else if (validphone && !validsms) {
      redirectIfNotCurrent("permissions.html");
    } else if (!validphone) {
      redirectIfNotCurrent("registration.html");
    } else if (quizCompleted && !surveyCompleted) {
      redirectIfNotCurrent("survey.html");
    }
  }

  // setCookie("withdrawal", true, 7);

  redirectToAppropriatePage();
});
