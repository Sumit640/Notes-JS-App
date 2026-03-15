export default class NotesModel {
    state = {
        notes: [],
        activeNoteId: null
    };

    getNotes() {
        return this.state.notes;
    }

    getNoteById(id) {
        return this.state.notes.find(note => note.id === id);
    }

    createNote() {
        const newNote = {
            id: Date.now(),
            title: "Untitled Note",
            content: ""
        };

        this.state.notes = [...this.state.notes, newNote ];
        this.saveNotes();
        return newNote;
    }

    deleteNote(id) {
        const noteToBeDeletedIndex = this.state.notes.findIndex(note => note.id === id);

        if(noteToBeDeletedIndex === -1) return;

        this.state.notes = this.state.notes.filter(note => note.id !== noteToBeDeletedIndex);
        this.saveNotes();
        return this.state.notes;
    }

    updateNote(id,newTitle,newContent) {
        const noteToBeUpdated = this.state.notes.find(note => note.id === id);

        if(!noteToBeUpdated) return;

        noteToBeUpdated.title = newTitle;
        noteToBeUpdated.content = newContent;
        this.saveNotes();
    }

    loadNotes() {
        const storedNotes = localStorage.getItem("notesList");

        if (storedNotes) {
            this.state.notes = JSON.parse(storedNotes);
        }

        return this.state.notes;
    }

    saveNotes() {
        localStorage.setItem("notesList", JSON.stringify(this.state.notes));
    }
}
