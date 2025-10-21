# Full-Stack To-Do Application with Django

A complete full-stack to-do list application built with a Python Django backend and a dynamic HTML, CSS, and JavaScript frontend. This project implements full CRUD (Create, Read, Update, Delete) functionality, allowing users to manage their tasks effectively. Key features include task searching, a light/dark theme toggle, and persistent data storage.


---

## 🚀 Core Features

* **Full CRUD Functionality**:
    * **Create**: Add new tasks with a mandatory title and an optional description.
    * **Read**: View all tasks in a clean, organized list.
    * **Update**: Mark tasks as "complete" or "incomplete" with a single click.
    * **Delete**: Permanently remove tasks from the list.
* **Persistent Storage**: Utilizes Django's backend and database to save all tasks, ensuring your to-do list is preserved across browser sessions.
* **Task Search**: Instantly filter the task list by typing keywords into the search bar.
* **Theme Toggle**: Switch between a visually pleasing light mode and a comfortable dark mode to suit your preference.
* **Responsive Design**: A clean and intuitive user interface that works seamlessly on different screen sizes.


<img width="1097" height="596" alt="Screenshot 2025-10-21 123055" src="https://github.com/user-attachments/assets/f67173ac-590a-4320-920e-de228f515828" />



<img width="1028" height="626" alt="Screenshot 2025-10-21 123106" src="https://github.com/user-attachments/assets/eed14ecc-e874-443e-b337-16c3295c703d" />




<img width="988" height="674" alt="Screenshot 2025-10-21 123209" src="https://github.com/user-attachments/assets/4a32c04d-44b8-49df-a38c-63a8cb244191" />




<img width="1037" height="691" alt="Screenshot 2025-10-21 123251" src="https://github.com/user-attachments/assets/6ceb7872-d26c-4fe5-a429-0f3babbfe6c0" />





---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript
* **Backend**: Python, Django
* **Database**: SQLite 3 (Default Django DB)

---

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Git
* Python 3.8+ and Pip

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/django-todo-app.git](https://github.com/your-username/django-todo-app.git)
    cd django-todo-app
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: If you don't have a `requirements.txt` file, you can create one with `pip freeze > requirements.txt` after installing Django).*

4.  **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```

5.  **Start the development server:**
    ```bash
    python manage.py runserver
    ```

6.  Open your web browser and navigate to `http://127.0.0.1:8000/` to see the application in action!

---

## 📝 How to Use

* **To Add a Task**: Type the task title (and optionally a description) into the input fields and click the "Add" button.
* **To Mark a Task Complete**: Click the checkmark or the task title itself to toggle its completion status.
* **To Delete a Task**: Click the trash can icon next to the task you wish to remove.
* **To Search for a Task**: Type your search query in the search bar at the top, and the list will update in real-time.
* **To Change Theme**: Click the theme toggle icon (e.g., a sun/moon icon) in the top corner of the page.

---
