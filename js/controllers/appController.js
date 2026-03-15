import NotesModel from "../models/notesModel.js";
import notesView from "../views/notesView.js";

const model = new NotesModel();

const newNoteBtn = document.getElementById("newNoteBtn");
const notesList = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const searchInput = document.getElementById("search");
const saveStatus = document.getElementById("saveStatus");
const themeToggle = document.getElementById("themeToggle");

const handleNewNote = function () {
  const newNote = model.createNote();

  model.state.activeNoteId = newNote.id;

  notesView.renderNotes(model.getNotes());

  notesView.highlightActiveNote(model.state.activeNoteId);

  notesView.renderEditor(newNote);
};

const handleNoteClick = function (e) {
  const deleteBtn = e.target.closest(".delete-btn");

  if (deleteBtn) {
    const noteItem = deleteBtn.closest(".note-item");
    const id = +noteItem.dataset.id;

    model.deleteNote(id);

    notesView.renderNotes(model.getNotes());

    if (model.state.activeNoteId === id) {
      model.state.activeNoteId = null;
      notesView.renderEditor({ title: "", content: "" });
    }

    return;
  }

  const noteItem = e.target.closest(".note-item");

  if (!noteItem) return;

  const id = +noteItem.dataset.id;

  model.state.activeNoteId = id;

  const note = model.getNoteById(id);

  notesView.highlightActiveNote(id);
  notesView.renderEditor(note);
};

const handleNoteEdit = function () {
  if (!model.state.activeNoteId) return;

  saveStatus.textContent = "Saving...";

  const title = noteTitle.value;
  const content = noteContent.value;

  model.updateNote(model.state.activeNoteId, title, content);

  setTimeout(() => {
    saveStatus.textContent = "Saved";
  },2000);  

  notesView.renderNotes(model.getNotes());
  notesView.highlightActiveNote(model.state.activeNoteId);
};

const handleSearch = function () {

  model.state.searchQuery = searchInput.value.toLowerCase();

  const filteredNotes = model.getNotes().filter(note => note.title.toLowerCase().includes(model.state.searchQuery));

  notesView.renderNotes(filteredNotes);
}

const handleShortcuts = function(e) {
  if (e.ctrlKey && e.key === "n") {
    e.preventDefault();
    handleNewNote();
  }

  if (e.ctrlKey && e.key === "f") {
    e.preventDefault();
    searchInput.focus();
  }
};

const toggleMode = function () {
  document.body.classList.toggle("dark");
};

const init = function () {
  model.loadNotes();
  notesView.renderNotes(model.getNotes());
  themeToggle.addEventListener("click", toggleMode);
  searchInput.addEventListener("input", handleSearch);
  newNoteBtn.addEventListener("click", handleNewNote);
  notesList.addEventListener("click", handleNoteClick);
  noteTitle.addEventListener("input", handleNoteEdit);
  noteContent.addEventListener("input", handleNoteEdit);
  document.addEventListener("keydown", handleShortcuts);
};

init();
