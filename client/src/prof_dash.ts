const inviteBtn = document.querySelector('.filter-container');
inviteBtn?.addEventListener('click', () => {
    const ownerName = "alberini"; // Dynamic in real app
    const url = `${window.location.origin}/booking?owner=${ownerName}`;
    navigator.clipboard.writeText(url);
    alert("Invitation URL copied to clipboard! Share this in slides or emails.");
});

document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.innerText.includes('Activate')) {
        const statusSpan = target.closest('div')?.querySelector('span');
        if (statusSpan) {
            statusSpan.innerText = "Active";
            statusSpan.style.color = "green";
            target.innerText = "Delete";
        }
    }

    if (target.innerText === 'Delete') {
        const studentEmail = "j.student@mail.mcgill.ca"; // Mock data
        if (confirm("Delete this slot? The booked student will be notified.")) {
            window.location.href = `mailto:${studentEmail}?subject=Booking Cancelled&body=Your appointment has been deleted.`;
            target.closest('.prof-card > div > div')?.remove();
        }
    }

    if (target.innerText === 'Message') {
        window.location.href = `mailto:j.student@mail.mcgill.ca?subject=Meeting Follow-up`;
    }
});