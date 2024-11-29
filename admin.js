// Admin login credentials (for simplicity, hardcoded)
const adminUsername = "admin";
const adminPassword = "password123";

// Admin login function
document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if credentials are correct
  if (username === adminUsername && password === adminPassword) {
    localStorage.setItem("adminLoggedIn", true);
    window.location.href = "admin-panel.html";  // Redirect to admin panel
  } else {
    alert("Invalid username or password");
  }
});

// Check if admin is logged in when loading the admin panel
window.onload = function() {
  // Ensure admin is logged in before accessing the panel
  if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "admin.html"; // Redirect to login if not logged in
  } else {
    loadCourses(); // Load courses from localStorage
  }

  // Logout function
  document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin.html"; // Redirect to login page
  });
};

// Load registered courses from localStorage
function loadCourses() {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const coursesContainer = document.getElementById("courses-container");
  coursesContainer.innerHTML = '';  // Clear the container before loading new courses

  if (courses.length > 0) {
    courses.forEach((course, index) => {
      const courseDiv = document.createElement("div");
      courseDiv.innerHTML = `
        <p><strong>Date:</strong> ${course.date}</p>
        <button onclick="editCourse(${index})">Edit</button>
        <button onclick="deleteCourse(${index})">Delete</button>
        <hr>
      `;
      coursesContainer.appendChild(courseDiv);
    });
  } else {
    coursesContainer.innerHTML = "<p>No courses registered yet.</p>";
  }
}

// Edit course function
function editCourse(index) {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const course = courses[index];
  const newDate = prompt("Enter new course date:", course.date);

  if (newDate) {
    course.date = newDate;
    courses[index] = course;
    localStorage.setItem("courses", JSON.stringify(courses));
    loadCourses();
  }
}

// Delete course function
function deleteCourse(index) {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  courses.splice(index, 1);
  localStorage.setItem("courses", JSON.stringify(courses));
  loadCourses();
}
