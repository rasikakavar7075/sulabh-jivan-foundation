document.getElementById('donationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    // PASTE THE NEW URL YOU JUST COPIED HERE
    const formUrl = 'https://script.google.com/macros/s/AKfycbxflDsq-WWA6hPeDwp0jF-MemZXG68ANFrg_1IPtkoD_LrkoXaVhxAEuSlgfb1zjX9jBw/exec'; 

    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            body: new FormData(form),
        });

        if (response.ok) {
            submitBtn.textContent = 'Donation Submitted! ✓';
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = 'Submit Donation';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Form submission failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        submitBtn.textContent = 'Error! Try again.';
        submitBtn.disabled = false;
        setTimeout(() => {
            submitBtn.textContent = 'Submit Donation';
        }, 3000);
    }
});