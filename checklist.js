const fs = require('fs');
const path = require('path');

// DOM Elements
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var checklistDisplay = document.getElementById('checklistDisplay');

// Directory for storing files
let pathName = path.join(__dirname, 'Files');

// Helper function to refresh checklist display
function refreshChecklistDisplay() {
    checklistDisplay.innerHTML = '';  // Clear existing list

    fs.readdir(pathName, (err, files) => {
        if (err) {
            return console.log("Error reading files:", err);
        }

        files.forEach(file => {
            let li = document.createElement('li');
            li.textContent = file.replace('.txt', '');

            // Open Button
            let btnRead = document.createElement('button');
            btnRead.textContent = 'Open';
            btnRead.addEventListener('click', () => readFile(file));

            // Close Button
            let btnClose = document.createElement('button');
            btnClose.textContent = 'Close';
            btnClose.addEventListener('click', () => {
                fileName.value = '';
                fileContents.value = '';
            });

            li.appendChild(btnRead);
            li.appendChild(btnClose);
            checklistDisplay.appendChild(li);
        });
    });
}

// Create file
btnCreate.addEventListener('click', function () {
    let file = path.join(pathName, `${fileName.value}.txt`);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log("Error creating file:", err);
        }
        alert(`${fileName.value} checklist was created`);

        // Clear input fields
        fileName.value = '';
        fileContents.value = '';

        // Refresh the checklist display
        refreshChecklistDisplay();
    });
});

// Read file
function readFile(filename) {
    let file = path.join(pathName, filename);

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log("Error reading file:", err);
        }
        fileName.value = filename.replace('.txt', '');
        fileContents.value = data;
    });
}

// Update file
btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, `${fileName.value}.txt`);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log("Error updating file:", err);
        }
        alert(`${fileName.value} checklist was updated`);
        refreshChecklistDisplay();
    });
});

// Delete file
btnDelete.addEventListener('click', function () {
    let file = path.join(pathName, `${fileName.value}.txt`);

    fs.unlink(file, function (err) {
        if (err) {
            return console.log("Error deleting file:", err);
        }

        // Clear input fields
        fileName.value = '';
        fileContents.value = '';

        alert(`${fileName.value} checklist was deleted`);
        refreshChecklistDisplay();
    });
});

// Initialize the checklist display
refreshChecklistDisplay();
