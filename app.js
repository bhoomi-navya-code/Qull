let notes = [];
let editingNoteId = null;

function loadNotes() {
    const savedNotes = localStorage.getItem("quickNote");
    return savedNotes ? JSON.parse(savedNotes) : [];
}

function handleSaveNote(event) {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if (editingNoteId) {
        const noteIndex = notes.findIndex(note => note.id === editingNoteId)
        notes[noteIndex]={
            ...notes[noteIndex],
            title: title,
            content:content
        }
    }
    else {
    notes.unshift({
        id: generateId(),
        title: title,
        content:content
    });}

    saveNotes();

    renderNotes();

    document.getElementById("noteForm").reset();

    closeNoteDialog();
}

function generateId() {
    return Date.now().toString();
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id != noteId);

    saveNotes();
    renderNotes();
}

function saveNotes() {
    localStorage.setItem("quickNote", JSON.stringify(notes));
}

function renderNotes() {
    const notesContainer = document.getElementById("notesContainer");

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                 <img class="empty" src="Add files-cuate.svg" alt="empty">
                <h2>No notes yet</h2>
                <p>Create your first note to get started!</p>
                <button class="add-btn" onclick="openNoteDialog()">
                    <i class="fa-solid fa-plus"></i> Add Your First Note
                </button>
                
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <button class="edit-btn"  onclick="openNoteDialog('${note.id}')" tilte="Edit Note"><i class="fa-solid fa-pen-clip"></i></button>
            <button class="delete-btn"  onclick="deleteNote('${note.id}')" title="Delete Note"><i class="fa-solid fa-trash" ></i></button>
        </div>
    `).join("");
}
function openTo_doDialog() {
    const todoDialog = document.getElementById("dolist-notet");
    todoDialog.showModal();
}

function closeTo_doDialog() {
    document.getElementById("dolist-notet").close();
}

function openProjectDialog() {
    const todoDialog = document.getElementById("project_dialog");
    todoDialog.showModal();
}

function closeProjectDialog() {
    document.getElementById("project_dialog").close();
}

function openNoteDialog(noteId = null) {
    const dialog = document.getElementById("dolist-note");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");

    if (noteId) {
        const noteToEdit = notes.find(note => note.id === noteId);


        editingNoteId = noteId;
        document.getElementById("dialog-title-note").textContent = "Edit Note";

        titleInput.value = noteToEdit.title;
        contentInput.value = noteToEdit.content;
    }
    else {
        editingNoteId = null;
        document.getElementById("dialog-title-note").textContent = "Add New Note";

        titleInput.value = ''
        contentInput.value = ''
    }

    dialog.showModal();
    titleInput.focus();
}

function closeNoteDialog() {
    document.getElementById("dolist-note").close();
}

function ToggleTheme(){
    document.body.classList.toggle("darkMode");

    const icon = document.querySelector("#themebtn i");

    if(document.body.classList.contains("darkMode")){
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-regular fa-moon";
    }


    if (localStorage.getItem('theme' === 'dark')) {
        document.body.classList.add('themebtn')        
    }
}



document.addEventListener("DOMContentLoaded", function () {
    notes = loadNotes();
    renderNotes();

    document.getElementById("noteForm")
        .addEventListener("submit", handleSaveNote);

    document.getElementById("themebtn")
        .addEventListener("click", ToggleTheme);

    document.getElementById("dolist-note")
        .addEventListener("click", function (event) {
            if (event.target === this) {
                closeNoteDialog();
            }
        });

    document.getElementById("dolist-notet")
        .addEventListener("click", function (event) {
            if (event.target === this) {
                closeTo_doDialog();
            }
        });
});



const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", function () {
    dropdownMenu.classList.remove("show");
});

// Prevent closing when clicking inside menu
dropdownMenu.addEventListener("click", function (e) {
    e.stopPropagation();
});