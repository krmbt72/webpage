// Store courses in localStorage
function storeCourse(course) {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Load registered courses from localStorage
function loadRegisteredCourses() {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];
  const coursesContainer = document.getElementById('registered-courses');
  coursesContainer.innerHTML = '';

  if (courses.length > 0) {
    courses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.innerHTML = `
        <p><strong>FullName:</strong> ${course.fullName}</p>
        <p><strong>Date:</strong> ${course.date}</p>
        <hr>
      `;
      coursesContainer.appendChild(courseDiv);
    });
  } else {
    coursesContainer.innerHTML = '<p>No courses registered yet.</p>';
  }
}

// Function to check if the selected time overlaps with any existing courses
function isTimeAvailable(selectedDate) {
  const courses = JSON.parse(localStorage.getItem('courses')) || [];

  // Convert selected date to a Date object
  const selectedStartTime = new Date(selectedDate);
  const selectedEndTime = new Date(selectedStartTime);
  selectedEndTime.setHours(selectedStartTime.getHours() + 1);  // Add one hour

  // Check for conflicts with existing courses
  for (let course of courses) {
    const courseStartTime = new Date(course.date);
    const courseEndTime = new Date(courseStartTime);
    courseEndTime.setHours(courseStartTime.getHours() + 1);  // Course duration is 1 hour

    // If the selected time overlaps with an existing course, return false
    if ((selectedStartTime < courseEndTime && selectedEndTime > courseStartTime)) {
      return false;  // Time conflict found
    }
  }

  return true;  // No conflict found
}

// Handle form submission for course registration
document.getElementById('course-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const courseDate = document.getElementById('course-date').value;

  // Check if the selected time is available
  if (!isTimeAvailable(courseDate)) {
    alert('The selected time is already booked or overlapping with another course.');
    return;
  }

  const newCourse = {
    fullName,
    email,
    phone,
    date: courseDate,
  };

  storeCourse(newCourse);

  // Reset the form after successful registration
  document.getElementById('course-form').reset();

  // Alert user and reload registered courses
  alert('Course registered successfully!');
  loadRegisteredCourses();
});

// Load registered courses when the page is loaded
window.onload = function() {
  loadRegisteredCourses();
};
