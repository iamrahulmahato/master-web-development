
const careInfo = {
    cactus: "Cacti thrive in bright sunlight and well-draining soil. Water sparingly—only when the soil is dry. Overwatering is the most common cause of issues with cacti. They prefer warmer temperatures and don't require much humidity.",
    fern: "Ferns enjoy indirect sunlight and high humidity. Water them regularly to keep the soil moist, but avoid waterlogging. They also thrive in slightly cooler environments, so keep them away from direct heat sources.",
    succulent: "Succulents need lots of light and very little water. They grow best in dry conditions, so make sure their soil drains well. Water deeply but infrequently, allowing the soil to dry out completely between waterings.",
    orchid: "Orchids require indirect light and high humidity. Water them once a week by soaking the roots, but make sure they have proper drainage to avoid root rot. They also benefit from orchid-specific fertilizer during their growing season."
};

const plantButtons = document.querySelectorAll('.plant-btn');
const careInfoDisplay = document.getElementById('care-info');

plantButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedPlant = this.getAttribute('data-plant');
        careInfoDisplay.textContent = careInfo[selectedPlant];
    });
});
