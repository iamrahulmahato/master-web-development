document.getElementById('generateName').addEventListener('click', function() {
    const habit = document.getElementById('habit').value.trim();
    const startLetter = document.getElementById('startLetter').value.trim().toLowerCase();
    const endLetter = document.getElementById('endLetter').value.trim().toLowerCase();

    const nameSuggestions = generatePetNames(habit, startLetter, endLetter);
    
    document.getElementById('suggestedName').textContent = nameSuggestions.length > 0 ? nameSuggestions.join(', ') : 'No suggestions available.';
});

function generatePetNames(habit, startLetter, endLetter) {
    const baseNames = [
        "Fluffy", "Buddy", "Max", "Bella", "Milo", "Luna", "Rocky", "Daisy",
        "Oliver", "Chloe", "Teddy", "Lucy", "Coco", "Leo", "Sophie", "Jack"
    ];
    
    const filteredNames = baseNames.filter(name => {
        return (!startLetter || name.toLowerCase().startsWith(startLetter)) &&
               (!endLetter || name.toLowerCase().endsWith(endLetter));
    });

    // Optionally add habit-based name logic here
    if (habit) {
        // Modify names based on habit/genre (simple example)
        return filteredNames.map(name => `${name} the ${habit}`);
    }
    
    return filteredNames;
}
