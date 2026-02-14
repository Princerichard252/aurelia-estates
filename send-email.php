// ==========================================
    // ACTIVATING THE CONTACT FORM (Via Formspree)
    // ==========================================
    if (advisoryForm) {
        advisoryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. Basic Validation (Same as before)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            if (!name || !email) {
                errorDisplay.innerText = "Please fill in required fields.";
                errorDisplay.classList.remove('hidden');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "Sending Inquiry...";

            // 2. Send to Formspree instead of PHP
            // Replace 'mqkvpown' with your own ID after your first test
            fetch('https://formspree.io/f/richardprince252@gmail.com', {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    successDisplay.classList.remove('hidden');
                    advisoryForm.reset();
                    submitBtn.innerText = "Inquiry Sent Successfully";
                    submitBtn.style.backgroundColor = "#25D366";
                } else {
                    errorDisplay.innerText = "Oops! There was a problem submitting your form.";
                    errorDisplay.classList.remove('hidden');
                }
            })
            .catch(error => {
                errorDisplay.innerText = "Unable to connect to the mail server.";
                errorDisplay.classList.remove('hidden');
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Send Advisory Request";
                    submitBtn.style.backgroundColor = "";
                }, 5000);
            });
        });
    }