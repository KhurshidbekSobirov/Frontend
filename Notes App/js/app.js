const addNote = document.querySelector('.addNote');


addNote.addEventListener('click', () => {
    addNewNote();
})

const Notes = JSON.parse(localStorage.getItem('notes'));

Notes.forEach(note => {
    addNewNote(note)
})


function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></button>
        </div>
        <div class="text_content"></div>
        <textarea id="textarea" class="textarea hidden" placeholder="Your notes..."></textarea>
    `
    
    document.body.appendChild(note);

    const editBtn = note.querySelector('.edit');
    const deleteBtn =note.querySelector('.delete');
    const notesEl = note.querySelector('.note');
    const text_content = note.querySelector('.text_content');
    const textarea = note.querySelector('textarea');
    
    deleteBtn.addEventListener('click', () => {
       Notes.forEach(txt => {
            if (textarea.value === txt) {
                note.remove();

                let newArr = Notes.filter(el => {
                    return el !== txt;
                })

                localStorage.setItem('notes', JSON.stringify(newArr))
            }
       })
    })

    
    editBtn.addEventListener('click', () => {
        text_content.classList.toggle('hidden')
        textarea.classList.toggle('hidden')
    })
    
    textarea.value = text;
    text_content.innerHTML = textarea.value;
    textarea.addEventListener('input', (event) => {
        const { value } = event.target;
        text_content.innerHTML = value;

        updateLS();
    })


}

function updateLS() {
    let notes = [];

    const textarea = document.querySelectorAll('textarea');

    textarea.forEach(note => {
        notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}