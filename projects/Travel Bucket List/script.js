document.addEventListener('DOMContentLoaded', () => {
    const destinationInput = document.getElementById('destination');
    const categorySelect = document.getElementById('category');
    const bucketList = document.getElementById('bucket-list');
    const counter = document.getElementById('counter');

    // Load existing bucket list from local storage
    const loadBucketList = () => {
        const items = JSON.parse(localStorage.getItem('bucketList')) || [];
        items.forEach(item => addItemToList(item.destination, item.category));
        updateCounter();
    };

    // Add item to the list
    const addItemToList = (destination, category) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${destination} (${category})`;
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.onclick = () => editItem(listItem, destination, category);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.onclick = () => {
            listItem.remove();
            updateLocalStorage();
            updateCounter();
        };

        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        bucketList.appendChild(listItem);
    };

    // Update local storage
    const updateLocalStorage = () => {
        const items = [];
        bucketList.querySelectorAll('li').forEach(item => {
            const text = item.textContent.split(' (')[0];
            const category = item.textContent.split(' (')[1].replace(')', '');
            items.push({ destination: text, category });
        });
        localStorage.setItem('bucketList', JSON.stringify(items));
    };

    // Update the destination counter
    const updateCounter = () => {
        const count = bucketList.children.length;
        counter.textContent = `Total Destinations: ${count}`;
    };

    // Edit item functionality
    const editItem = (listItem, oldDestination, oldCategory) => {
        const newDestination = prompt('Edit destination:', oldDestination);
        const newCategory = prompt('Edit category (Want to Visit / Visited):', oldCategory);

        if (newDestination) {
            listItem.firstChild.textContent = `${newDestination} (${newCategory})`;
            updateLocalStorage();
        }
    };

    // Add new destination
    document.getElementById('add-btn').addEventListener('click', () => {
        const destinationValue = destinationInput.value.trim();
        const categoryValue = categorySelect.value;

        if (destinationValue === "") {
            alert("Please enter a destination!");
            return;
        }

        addItemToList(destinationValue, categoryValue);
        updateLocalStorage();
        updateCounter();

        destinationInput.value = '';
    });

    // Load existing items on page load
    loadBucketList();
});
