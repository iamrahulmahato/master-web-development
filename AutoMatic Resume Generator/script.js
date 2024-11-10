function loadPhoto(event) {
  const previewPhoto = document.getElementById("preview-photo");
  previewPhoto.src = URL.createObjectURL(event.target.files[0]);
}

function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const summary = document.getElementById("summary").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;

  document.getElementById("preview-name").innerText = name;
  document.getElementById(
    "preview-contact"
  ).innerText = `${email} | ${phone} | ${address}`;
  document.getElementById("preview-summary").innerText = summary;
  document.getElementById("preview-experience").innerText = experience;
  document.getElementById("preview-education").innerText = education;
  document.getElementById("preview-skills").innerText = skills
    .split(",")
    .join(", ");

  document.getElementById("resume-preview").style.display = "block";
}

function downloadResume() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(document.getElementById("preview-name").innerText, 10, 10);
  doc.text(document.getElementById("preview-contact").innerText, 10, 20);

  doc.text("Summary", 10, 30);
  doc.text(document.getElementById("preview-summary").innerText, 10, 40);
  doc.text("Experience", 10, 60);
  doc.text(document.getElementById("preview-experience").innerText, 10, 70);
  doc.text("Education", 10, 90);
  doc.text(document.getElementById("preview-education").innerText, 10, 100);
  doc.text("Skills", 10, 120);
  doc.text(document.getElementById("preview-skills").innerText, 10, 130);

  doc.save("resume.pdf");
}
