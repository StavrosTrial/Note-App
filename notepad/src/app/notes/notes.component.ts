import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  note: string = '';
  savedNotes: any[] = [];
  isEditing: boolean[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes().subscribe((notes) => {
      this.savedNotes = notes;
      this.isEditing = new Array(notes.length).fill(false);
    });
  }

  addNote() {
    if (this.note.trim() !== '') {
      this.noteService.createNote({ content: this.note }).subscribe((newNote) => {
        this.savedNotes.push(newNote);
        this.isEditing.push(false);
        this.note = '';
      }, (error) => {
        console.error('Error creating note:', error);
      });
    }
  }

  deleteNote(index: number) {
    const note = this.savedNotes[index];
    this.noteService.deleteNote(note._id).subscribe(() => {
      this.savedNotes.splice(index, 1);
      this.isEditing.splice(index, 1);
    }, (error) => {
      console.error('Error deleting note:', error);
    });
  }

  startEditing(index: number) {
    // Set all isEditing to false except for the one being edited
    this.isEditing = this.isEditing.map((value, idx) => idx === index);
  }

  saveEdit(index: number) {
    const note = this.savedNotes[index];
    this.noteService.updateNote(note._id, { content: note.content }).subscribe({
      next: (updatedNote) => {
        this.savedNotes[index] = updatedNote;
        this.isEditing[index] = false;
      },
      error: (err) => console.error('Error updating note:', err)
    });
  }

  cancelEdit(index: number) {
    this.isEditing[index] = false;
  }
}
