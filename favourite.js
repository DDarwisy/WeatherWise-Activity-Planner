// Load favorite lists from localStorage and display them
function loadFavoriteLists() {
    const lists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
    const container = document.getElementById('listsContainer');
    container.innerHTML = ''; // Clear existing content

    Object.keys(lists).forEach(listName => {
        const listDiv = document.createElement('div');
        listDiv.className = 'favorite-list';

        const title = document.createElement('h2');
        title.textContent = listName;

        const deleteListBtn = document.createElement('button');
        deleteListBtn.textContent = 'Delete List';
        deleteListBtn.onclick = () => deleteList(listName);

        const placesList = document.createElement('ul');
        lists[listName].forEach((place, index) => {
            const placeItem = document.createElement('li');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.setAttribute('data-list-name', listName);
            removeBtn.setAttribute('data-index', index);
            removeBtn.onclick = () => removePlace(removeBtn.getAttribute('data-list-name'), removeBtn.getAttribute('data-index'));

            placeItem.innerHTML = `${place.name} (${place.location})`;
            placeItem.appendChild(removeBtn);
            placesList.appendChild(placeItem);
        });

        listDiv.appendChild(title);
        listDiv.appendChild(deleteListBtn);
        listDiv.appendChild(placesList);
        container.appendChild(listDiv);
    });
}

// Create a new list
document.getElementById('createListBtn').addEventListener('click', () => {
    const newListName = document.getElementById('newListName').value.trim();
    if (!newListName) {
        alert('Please enter a valid list name.');
        return;
    }

    const lists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
    if (lists[newListName]) {
        alert('A list with this name already exists.');
        return;
    }

    lists[newListName] = [];
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
    document.getElementById('newListName').value = '';
    loadFavoriteLists();
});

// Delete an entire list
function deleteList(listName) {
    const lists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
    delete lists[listName];
    localStorage.setItem('favoriteLists', JSON.stringify(lists));
    loadFavoriteLists();
}

// Remove a specific place from a list
function removePlace(listName, index) {
    const lists = JSON.parse(localStorage.getItem('favoriteLists')) || {};
    index = parseInt(index); // Convert index to a number

    // Check if the list exists and has places before trying to remove
    if (lists[listName] && lists[listName].length > index) {
        lists[listName].splice(index, 1);
        localStorage.setItem('favoriteLists', JSON.stringify(lists));
        loadFavoriteLists();
    } else {
        alert('Place not found or index is out of bounds.');
    }
}

// Load lists on page load
window.onload = loadFavoriteLists;
