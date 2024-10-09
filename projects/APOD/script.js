const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.click();
};



document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.getElementById('content');
    const todayBtn = document.getElementById('todayBtn');
    const searchBtn = document.getElementById('asodb');
    const apiKey = 'DEMO_KEY';

    const dataToday = async () => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        return res.json();
    };

    const dataByDate = async (date) => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
        return res.json();
    };

   

    const renderContent = (data) => {
        contentDiv.innerHTML = `
            ${data.media_type === 'image' ? `
            <div class="todayimg">
                <div class="sec">
                    <img class="img" src="${data.url}" alt="${data.title}" onclick="handleDownload('${data.hdurl}', '${data.title}')" />
                    <button class="download" onclick="handleDownload('${data.hdurl}', '${data.title}')">View</button>
                </div>
                <div class="info">
                    <h1 class="t-title">${data.title}</h1>
                    <p class="t-ex">${data.explanation}</p>
                    <p class="t-date">${data.date}</p>
                    <h6 class="t-copyright">${data.copyright || ''}</h6>
                </div>
            </div>` : `
            <div class="todayVideo">
                <div class="sec">
                    <iframe src="${data.url}" class="vdo" frameborder="0"></iframe>
                </div>
                <div class="info">
                    <h1 class="t-title">${data.title}</h1>
                    <p class="t-ex">${data.explanation}</p>
                    <p class="t-date">${data.date}</p>
                    <h6 class="t-copyright">${data.copyright || ''}</h6>
                </div>
            </div>`}
        `;
    };

    const fetchTodayData = async () => {
        const todayData = await dataToday();
        renderContent(todayData);
    };

    todayBtn.addEventListener('click', fetchTodayData);

    searchBtn.addEventListener('click', async () => {
        const input = document.querySelector('.apodInput');
        if (input.value) {
            const searchData = await dataByDate(input.value);
            renderContent(searchData);
        } else {
            alert('Please enter a date in the format YYYY-MM-DD');
        }
    });
   

    // Fetch today's APOD on page load
    fetchTodayData();
});
