document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-action");
  const contents = document.querySelectorAll(".tab-content");
  const submitQuizBtn = document.getElementById("submit-quiz");

  const surveyItems = document.querySelectorAll(".tab-survey-item");
  // const quizButton = document.getElementById("quiz-btn");
  const arrowLeft = document.getElementById("arrow-left");
  const arrowRight = document.getElementById("arrow-right");

  function updateArrowButtons() {
    const currentTab = document.querySelector(".tab-action.active");
    arrowLeft.disabled = currentTab.previousElementSibling === null;
    arrowRight.disabled = currentTab.nextElementSibling === null;
  }

  arrowLeft.addEventListener("click", function () {
    const currentTab = document.querySelector(".tab-action.active");
    const prevTab = currentTab.previousElementSibling || tabs[tabs.length - 1];
    prevTab.click();
    updateArrowButtons();
  });

  arrowRight.addEventListener("click", function () {
    const currentTab = document.querySelector(".tab-action.active");
    const nextTab = currentTab.nextElementSibling || tabs[0];
    nextTab.click();
    updateArrowButtons();
  });
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-tab");
      const activeContent = document.querySelector(".tab-content.active");
      const newActiveContent = document.getElementById(`${target}-content`);

      // Slide out the currently active content to the left
      if (activeContent) {
        activeContent.style.transform = "translateX(-100%)";
      }
      // Slide in the new content from the right
      newActiveContent.style.transform = "translateX(0)";

      // Update active states after the transition completes
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");
      newActiveContent.classList.add("active");
    });
  });
  function updateSubmitButton() {
    const allTabsSelected = Array.from(tabs).every((tab) =>
      tab.classList.contains("active-tab-action")
    );
    submitQuizBtn.style.display = allTabsSelected ? "block" : "none";
  }
  surveyItems.forEach((item) => {
    item.addEventListener("click", function () {
      const parentTab = item.closest(".tab-content");
      const parentTabId = parentTab.id;
      const parentTabAction = document.querySelector(
        `[data-tab=${parentTabId.replace("-content", "")}]`
      );
      const itemsInTab = parentTab.querySelectorAll(".tab-survey-item");
      itemsInTab.forEach((i) => i.classList.remove("selected-content"));
      item.classList.add("selected-content");
      parentTabAction.classList.add("active-tab-action");
      updateSubmitButton();
    });
  });
  updateSubmitButton();
  updateArrowButtons();
});
