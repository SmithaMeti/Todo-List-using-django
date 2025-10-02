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
  // --- Checkbox Logic (UPDATED for hiding checkbox only) ---
  const checkboxes = document.querySelectorAll(".completed-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const li = checkbox.closest("li");
      const pk = li.dataset.pk;
      const isCompleted = checkbox.checked;

      // This part stays the same: Update the strikethrough on the title
      const title = li.querySelector(".todo-title");
      title.classList.toggle("completed-title", isCompleted);

      // This is the only new line needed!
      // It adds the 'hidden' class if checked, and removes it if unchecked.
      checkbox.classList.toggle("hidden", isCompleted);

      // This part stays the same: Send the update to the backend.
      fetch(`/toggle_complete/${pk}/`, {
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
