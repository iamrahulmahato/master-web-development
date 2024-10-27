document.addEventListener("DOMContentLoaded", function() {
    let totalSeats = 40; // Total number of seats available
    const seatsLeftElement = document.getElementById("seatsLeft");

    // Show summary function
    function showSummary() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const seats = parseInt(document.getElementById('seats').value);
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        if (name && email && seats && from && to) {
            if (seats > totalSeats) {
                alert("Not enough seats available. Please reduce the number of seats.");
                return;
            }

            const summaryDetails = `
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Number of Seats:</strong> ${seats}<br>
                <strong>From:</strong> ${from}<br>
                <strong>To:</strong> ${to}
            `;

            document.getElementById('summaryDetails').innerHTML = summaryDetails;
            document.getElementById('summary').classList.remove('hidden');
        } else {
            alert("Please fill in all the details.");
        }
    }

    // Book ticket function
    function bookTicket() {
        const seats = parseInt(document.getElementById('seats').value);
        totalSeats -= seats;

        const name = document.getElementById('name').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        const ticketDetails = `
            <strong>Ticket for:</strong> ${name}<br>
            <strong>Number of Seats:</strong> ${seats}<br>
            <strong>From:</strong> ${from}<br>
            <strong>To:</strong> ${to}<br>
            <strong>Status:</strong> Confirmed
        `;

        document.getElementById('ticketDetails').innerHTML = ticketDetails;
        document.getElementById('ticket').classList.remove('hidden');
        document.getElementById('summary').classList.add('hidden');

        // Update seats left
        seatsLeftElement.innerHTML = `Seats Left: <strong>${totalSeats}</strong>`;

        // Disable form fields after booking
        document.getElementById('name').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('seats').disabled = true;
        document.getElementById('from').disabled = true;
        document.getElementById('to').disabled = true;
    }

    // Attach event listeners to buttons
    document.querySelector('button[onclick="showSummary()"]').addEventListener("click", showSummary);
    document.querySelector('button[onclick="bookTicket()"]').addEventListener("click", bookTicket);
});
