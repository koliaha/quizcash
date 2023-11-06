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

  //   var currentPage = window.location.href.split("/").pop();
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
  function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  function setCookie(name, value, daysToLive) {
    var date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  if (window.location.pathname.endsWith("/registration.html")) {
    const cookval = getCookie("validphone");
    if (cookval === "true") {
      window.location.href = "./permissions.html";
    }
  }
  if (window.location.pathname.endsWith("/permissions.html")) {
    const cookval = getCookie("validsms");
    if (cookval === "true") {
      window.location.href = "./quiz.html";
    }
  }
  if (window.location.pathname.endsWith("/quiz.html")) {
    const cookval = getCookie("quized");
    if (cookval === "true") {
      window.location.href = "./survey.html";
    }
  }
  if (window.location.pathname.endsWith("/card.html")) {
    const cookval = getCookie("card");
    if (cookval === "true") {
      window.location.href = "./form.html";
    }
  }
  if (
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/home.php")
  ) {
    const cookval = getCookie("withdrawal");
    if (cookval === "true") {
      window.location.href = "./withdrawal.html";
    }
  }
});
