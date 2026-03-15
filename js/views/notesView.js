

class NotesView {
    #notesList = document.getElementById("notesList");
    #noteTitle = document.getElementById("noteTitle");
    #noteContent = document.getElementById("noteContent");

    renderNotes(notes) {
        this.#notesList.innerHTML = "";

        notes.forEach(note => {
            const li = document.createElement("li");

            li.classList.add("note-item");
            li.dataset.id = note.id;
            li.textContent = note.title;

            li.innerHTML = `
                <span class="note-title">${note.title}</span>
                <button class="delete-btn">✕</button>
            `;

            this.#notesList.appendChild(li);
        });
    }

    renderEditor(note) {
        if (!note) return;

        this.#noteTitle.value = note.title;
        this.#noteContent.value = note.content;
    }

    highlightActiveNote(id) {
        const items = this.#notesList.querySelectorAll(".note-item");

        items.forEach(item => {
            item.classList.remove("active");

            if (+(item.dataset.id) === id) {
                item.classList.add("active");
            }
        });
    }
};

export default new NotesView();