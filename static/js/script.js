document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme"); // Select the button
  const body = document.body; // Select the body element directly

  // --- 1. Load theme preference from localStorage on page load ---
  const savedTheme = localStorage.getItem("themePreference"); // Use a consistent key
  console.log("Loaded theme preference:", savedTheme); // For debugging

  if (savedTheme === "dark") {
    // If the saved preference is 'dark', apply the dark mode class immediately
    body.classList.add("dark-mode");
  }
  // If savedTheme is null, 'light', or anything else, the default CSS (light mode) applies,
  // so we don't need an else block here unless you specifically save 'light'.

  // --- 2. Add click listener to toggle and save ---
  if (themeToggle && body) {
    // Check if both elements were found
    themeToggle.addEventListener("click", () => {
      // Toggle the 'dark-mode' class on the BODY element
      body.classList.toggle("dark-mode");

      // After toggling, check the *new* state of the body class
      if (body.classList.contains("dark-mode")) {
        // If dark mode is now active, save 'dark' preference
        localStorage.setItem("themePreference", "dark");
        console.log("Saved theme preference: dark"); // For debugging
      } else {
        // If dark mode is no longer active, save 'light' preference
        localStorage.setItem("themePreference", "light");
        console.log("Saved theme preference: light"); // For debugging
        // Alternatively, you could use localStorage.removeItem('themePreference');
        // if you prefer not to save 'light' explicitly.
      }
    });
  } else {
    console.error("Button with class 'theme' or the body element not found!");
  }
});

// // Get all checkboxes with the class 'completed-checkbox'
// const checkboxes = document.querySelectorAll(".completed-checkbox");

// // Add an event listener to each checkbox
// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener("change", function () {
//     // Get the primary key from the parent li element's data-pk attribute
//     const todoPk = this.closest("li").dataset.pk;
//     console.log(todoPk);
//     // Get the corresponding title element
//     const todoTitle = this.closest("li").querySelector(".todo-title");
//     console.log(todoTitle);
//     // Determine the new completed status
//     const isCompleted = this.checked;
//     console.log(isCompleted);

//     // Toggle the 'completed-title' class on the title element immediately
//     if (isCompleted) {
//       todoTitle.classList.add("completed-title");
//     } else {
//       todoTitle.classList.remove("completed-title");
//     }

//     // Send an AJAX request to the backend to update the status
//     // You'll need to include CSRF token for POST requests
//     // This example assumes you have a way to get the CSRF token,
//     // e.g., from a cookie or a hidden input field.
//     // A common way in Django is to use {% csrf_token %} in a form
//     // and get its value, or get it from the cookie.
//     // For simplicity, let's assume you can get it like this:
//     const csrftoken = getCookie("csrftoken"); // You need to define getCookie function

//     fetch(`/toggle_complete/${todoPk}`, {
//       // Use the correct URL path
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrftoken, // Include the CSRF token
//       },
//       body: JSON.stringify({ completed: isCompleted }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           // If the server response is not OK, revert the UI change
//           this.checked = !isCompleted; // Revert checkbox state
//           if (isCompleted) {
//             todoTitle.classList.remove("completed-title");
//           } else {
//             todoTitle.classList.add("completed-title");
//           }
//           console.error("Failed to update todo status on the server.");
//         }
//       })
//       .catch((error) => {
//         // Handle network errors
//         this.checked = !isCompleted; // Revert checkbox state
//         if (isCompleted) {
//           todoTitle.classList.remove("completed-title");
//         } else {
//           todoTitle.classList.add("completed-title");
//         }
//         console.error("Error sending update request:", error);
//       });
//   });
// });

// // Helper function to get CSRF cookie value
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }


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

