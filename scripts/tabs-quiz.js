document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-action");
  const contents = document.querySelectorAll(".tab-content");
  const contentBlocks = document.querySelectorAll(".tab-content > div"); // Direct children of .tab-content
  const quizButton = document.getElementById("quiz-btn");
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

  contentBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      // Remove 'selected' state from all blocks
      contentBlocks.forEach((b) => b.classList.remove("selected-content"));

      // Add 'selected' state to clicked block
      block.classList.add("selected-content");

      // Enable the quiz button
      quizButton 
      ? quizButton.disabled = false
      :''
    });
  });
  quizButton?.addEventListener("click", function () {
    window.location.href = "../survey.html";
  });
});
