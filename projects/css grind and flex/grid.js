function applyGridSettings() {
    const columns = document.getElementById('grid-columns').value;
    const rows = document.getElementById('grid-rows').value;

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.gridTemplateColumns = columns || '1fr';
    gridContainer.style.gridTemplateRows = rows || '1fr';
}

function applyFlexboxSettings() {
    const flexDirection = document.getElementById('flex-direction').value;
    const justifyContent = document.getElementById('justify-content').value;

    const flexContainer = document.querySelector('.flex-container');
    flexContainer.style.flexDirection = flexDirection;
    flexContainer.style.justifyContent = justifyContent;
}
