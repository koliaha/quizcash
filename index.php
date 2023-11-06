<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Cash</title>
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
</head>

<body>
    <section class="main">
        <div class="container">
            <div class="main-title">
                <img src="./img/logo.svg" class="main-logo" alt="logo">
                <h3 class="main-subtitle">Hello, 11 surveys are available!</h3>
            </div>
            <div class="btn-wrapper">
                <a href="./registration.html" class="btn main-link primary-gradient">Start Quiz</a>
            </div>
        </div>
    </section>
    <script src="./navigation.js"></script>
    <script>
        // When the DOM is fully loaded, redirect to the last page if the cookie is set
        document.addEventListener('DOMContentLoaded', function () {
            var lastPageIndex = getCookie('lastPageIndex');
            if (lastPageIndex !== null) {
                openPage(parseInt(lastPageIndex));
            }
            // if (getCookie('validphone') == true) window.location.href = './permissions.html';
        });
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
    </script>

</body>

</html>