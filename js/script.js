function searchTutors() {

  let keyword = document.getElementById("keyword")
    .value.toLowerCase().trim();

  let level = document.getElementById("level").value;

  let mode = document.getElementById("mode").value;

  let tutors = document.querySelectorAll(".tutor");

  let found = 0;

  tutors.forEach(function(tutor) {

    let name = tutor.dataset.name;
    let subject = tutor.dataset.subject;

    let matchKeyword =
      !keyword ||
      name.includes(keyword) ||
      subject.includes(keyword);

    let matchLevel =
      !level || tutor.dataset.level === level;

    let matchMode =
      !mode || tutor.dataset.mode === mode;

    if (matchKeyword && matchLevel && matchMode) {
      tutor.style.display = "block";
      found++;
    } else {
      tutor.style.display = "none";
    }

  });

  document.getElementById("noResults").style.display =
    found ? "none" : "block";

  document.getElementById("tutors").scrollIntoView({
    behavior: "smooth"
  });

}

function contactTutor(name) {
  window.location.href = "contact.html?teacher=" + encodeURIComponent(name);
}

function registerTeacher(event) {

  event.preventDefault();

  const form = event.target;
  const teacher = {
    name: form.teacherName.value.trim(),
    email: form.teacherEmail.value.trim(),
    phone: form.teacherPhone.value.trim(),
    city: form.teacherCity.value.trim(),
    qualification: form.teacherQualification.value.trim(),
    subject: form.querySelector('select').value,
    teachingMode: form.querySelectorAll('select')[1].value,
    status: "Pending",
    submittedAt: new Date().toLocaleString()
  };

  const applications = JSON.parse(
    localStorage.getItem("smartUstadTeacherApplications") || "[]"
  );

  applications.push(teacher);

  localStorage.setItem(
    "smartUstadTeacherApplications",
    JSON.stringify(applications)
  );

  alert("Teacher application saved on this browser. Status: Pending review.");
  form.reset();
}

function registerForm(event) {

  event.preventDefault();

  alert("Thank you! Your registration demo was submitted.");

  event.target.reset();

}

function contactForm(event) {

  event.preventDefault();

  alert("Thank you! Your message demo was submitted.");

  event.target.reset();

}


document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const teacher = params.get("teacher");
  if (teacher) {
    const subjectField = document.querySelector('#contact input[placeholder="Subject"]');
    if (subjectField) subjectField.value = "Tuition Request: " + teacher;
  }
});
