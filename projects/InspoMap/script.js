// Sample data for daily quotes or challenges
const inspirationData = {
    1: "“Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.”",
    2: "Challenge: Write down three things you're grateful for today.",
    3: "“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.”",
    4: "Challenge: Do one kind thing for someone today, even if it's a small gesture."
};

// Track which regions are unlocked
let unlockedRegions = [1]; // Start with only Region 1 unlocked

// Unlock a new region each day
function unlockRegions() {
    const today = new Date().getDate();
    unlockedRegions = Array.from({length: today % 4 + 1}, (_, i) => i + 1);

    // Update the map display
    document.querySelectorAll('.region').forEach((region, index) => {
        if (unlockedRegions.includes(index + 1)) {
            region.classList.remove('locked');
        } else {
            region.classList.add('locked');
        }
    });
}

// Show inspiration for a region if it's unlocked
function showInspiration(regionNumber) {
    if (unlockedRegions.includes(regionNumber)) {
        document.getElementById('inspiration-text').innerText = inspirationData[regionNumber];
    } else {
        document.getElementById('inspiration-text').innerText = "This region is locked. Come back tomorrow to unlock more inspiration!";
    }
}

// Initialize map on page load
document.addEventListener("DOMContentLoaded", unlockRegions);
