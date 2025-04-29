document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme");
  const body = document.body;
  const savedTheme = localStorage.getItem("themePreference");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  if (themeToggle && body) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("themePreference", "dark");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("themePreference", "light");
        themeToggle.textContent = "🌙";
      }
    });
  } else {
    console.error("Button with class 'theme' or the body element not found!");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".completed-checkbox");

  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
          const li = checkbox.closest("li");
          const pk = li.dataset.pk;
          const isCompleted = checkbox.checked;

          // Update the class on the title
          const title = li.querySelector(".todo-title");
          title.classList.toggle("completed-title", isCompleted);

          // Send AJAX request to update the backend
          fetch(`/toggle_complete/${pk}/`, {  // Use /toggle_complete/${pk}/ here
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": getCSRFToken(),
              },
              body: JSON.stringify({ completed: isCompleted }),
          });
      });
  });

  // Helper to get CSRF token from the hidden input
  function getCSRFToken() {
      return document.getElementById("csrf-token").value;
  }
});

