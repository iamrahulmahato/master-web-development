// script.js
const generateBtn = document.getElementById('generateBtn');
const nameInput = document.getElementById('name');
const birthdateInput = document.getElementById('birthdate');
const horoscopeDiv = document.getElementById('horoscope');
const starMapCanvas = document.getElementById('starMap');
const ctx = starMapCanvas.getContext('2d');

// Zodiac signs and their date ranges
const zodiacSigns = [
    { sign: "Aries", start: new Date("03/21"), end: new Date("04/19") },
    { sign: "Taurus", start: new Date("04/20"), end: new Date("05/20") },
    { sign: "Gemini", start: new Date("05/21"), end: new Date("06/20") },
    { sign: "Cancer", start: new Date("06/21"), end: new Date("07/22") },
    { sign: "Leo", start: new Date("07/23"), end: new Date("08/22") },
    { sign: "Virgo", start: new Date("08/23"), end: new Date("09/22") },
    { sign: "Libra", start: new Date("09/23"), end: new Date("10/22") },
    { sign: "Scorpio", start: new Date("10/23"), end: new Date("11/21") },
    { sign: "Sagittarius", start: new Date("11/22"), end: new Date("12/21") },
    { sign: "Capricorn", start: new Date("12/22"), end: new Date("01/19") },
    { sign: "Aquarius", start: new Date("01/20"), end: new Date("02/18") },
    { sign: "Pisces", start: new Date("02/19"), end: new Date("03/20") },
];

// Horoscope messages based on zodiac signs
const horoscopeMessages = {
    Aries: "Today is a great day to take charge and lead!",
    Taurus: "Patience will bring you rewards today.",
    Gemini: "Expect unexpected communications and connections.",
    Cancer: "Focus on your home and family life for stability.",
    Leo: "Embrace your creative side; it's your time to shine!",
    Virgo: "Organize your tasks for a productive day.",
    Libra: "Seek balance and harmony in your relationships.",
    Scorpio: "Embrace your intensity; it will guide you today.",
    Sagittarius: "Adventure awaits; seek new experiences.",
    Capricorn: "Your hard work is paying off; stay focused.",
    Aquarius: "Innovative ideas will flourish today.",
    Pisces: "Trust your intuition; it will guide your decisions."
};

// Generate horoscope and star map
generateBtn.addEventListener('click', () => {
    const name = nameInput.value;
    const birthDate = new Date(birthdateInput.value);
    const month = birthDate.getMonth() + 1; // months are zero-indexed
    const day = birthDate.getDate();

    // Determine zodiac sign
    let zodiacSign = '';
    for (const zodiac of zodiacSigns) {
        const startDate = new Date(birthDate.getFullYear(), zodiac.start.getMonth(), zodiac.start.getDate());
        const endDate = new Date(birthDate.getFullYear(), zodiac.end.getMonth(), zodiac.end.getDate());
        if (birthDate >= startDate && birthDate <= endDate) {
            zodiacSign = zodiac.sign;
            break;
        }
    }

    // Display horoscope
    if (zodiacSign) {
        horoscopeDiv.innerHTML = `<strong>${name}</strong>, your zodiac sign is <strong>${zodiacSign}</strong>: ${horoscopeMessages[zodiacSign]}`;
    } else {
        horoscopeDiv.innerHTML = 'Please enter a valid birth date.';
    }

    // Draw star map (basic representation)
    drawStarMap(month, day);
});

// Draw star map
function drawStarMap(month, day) {
    ctx.clearRect(0, 0, starMapCanvas.width, starMapCanvas.height);
    ctx.fillStyle = 'white';
    
    // Draw multiple stars for a more interesting star map
    for (let i = 0; i < 20; i++) { // Draw 20 random stars
        const starX = Math.random() * starMapCanvas.width;
        const starY = Math.random() * starMapCanvas.height;

        ctx.beginPath();
        ctx.arc(starX, starY, 3 + Math.random() * 3, 0, Math.PI * 2); // Random size for stars
        ctx.fill();
    }

    // Optional: Draw a special star based on the user's birth date
    const specialStarX = (month * 30) % starMapCanvas.width;
    const specialStarY = (day * 10) % starMapCanvas.height;

    ctx.fillStyle = '#ffcc00'; // Color for the special star
    ctx.beginPath();
    ctx.arc(specialStarX, specialStarY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('★', specialStarX - 10, specialStarY - 10);
}
