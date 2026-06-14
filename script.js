const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);

    formMessage.textContent = "";
    formMessage.className = "form-message";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Wird gesendet...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formMessage.textContent =
          "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.";
        formMessage.classList.add("success");

        contactForm.reset();
      } else {
        formMessage.textContent =
          "Leider konnte die Nachricht nicht gesendet werden. Bitte versuche es erneut oder schreibe direkt eine E-Mail.";
        formMessage.classList.add("error");
      }
    } catch (error) {
      formMessage.textContent =
        "Es gab ein technisches Problem. Bitte versuche es später erneut oder schreibe direkt eine E-Mail.";
      formMessage.classList.add("error");
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Anfrage absenden";
    }
  });
}
