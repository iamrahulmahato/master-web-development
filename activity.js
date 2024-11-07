const listItems = document.querySelectorAll('.activity-feed li');

listItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const detailElement = item.querySelector('.detail');

        // If details are already open, close them
        if (detailElement) {
            detailElement.remove();
        } else {
            // Close any open details
            const openDetails = document.querySelectorAll('.detail');
            openDetails.forEach((detail) => {
                detail.remove();
            });

            // Open the clicked item's details
            const detailHtml = getDetailHtml(index);
            const detailContainer = document.createElement('div');
            detailContainer.className = 'detail';
            detailContainer.innerHTML = detailHtml;
            item.appendChild(detailContainer);
        }
    });
});

function getDetailHtml(index) {
    let detailHtml = '';
    switch (index) {
        case 0:
            detailHtml = `
                <h3>Profile Update</h3>
                <p>Update ID: #1001</p>
                <p>Date: 2024-11-05</p>
                <p>Time: 13:30</p>
                <p>Details: <strong>Profile information updated successfully</strong></p>
            `;
            break;
        case 1:
            detailHtml = `
                <h3>Friend Request</h3>
                <p>Request ID: #1002</p>
                <p>Date: 2024-11-05</p>
                <p>Time: 11:00</p>
                <p>From: <strong>Ritu</strong></p>
            `;
            break;
        case 2:
            detailHtml = `
                <h3>New Game Alert</h3>
                <p>Game ID: #1003</p>
                <p>Date: 2024-11-04</p>
                <p>Time: 16:00</p>
                <p>Game: <strong>Mystery Island</strong></p>
            `;
            break;
        case 3:
            detailHtml = `
                <h3>Message from Divya</h3>
                <p>Message ID: #1004</p>
                <p>Date: 2024-11-04</p>
                <p>Time: 15:00</p>
                <p>Message: "Are you joining the game tonight?"</p>
            `;
            break;
        case 4:
            detailHtml = `
                <h3>Message from Support</h3>
                <p>Message ID: #1005</p>
                <p>Date: 2024-11-03</p>
                <p>Time: 10:30</p>
                <p>Message: "Your issue has been resolved"</p>
            `;
            break;
        default:
            detailHtml = '';
    }
    return detailHtml;
}

