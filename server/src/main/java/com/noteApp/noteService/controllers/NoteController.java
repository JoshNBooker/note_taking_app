package com.noteApp.noteService.controllers;

import com.noteApp.noteService.repositories.NoteRepository;
import com.noteApp.noteService.models.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class NoteController {
    @Autowired
    NoteRepository noteRepository;
    @GetMapping(value = "/notes")
    public ResponseEntity<List<Note>> getAllNotes() {
        return new ResponseEntity<>(noteRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/notes/{id}")
    public ResponseEntity getNote(@PathVariable Long id) {
        return new ResponseEntity<>(noteRepository.findById(id), HttpStatus.OK);
    }
    @PostMapping(value = "/notes")
    public void createNote(@RequestBody Note newNote) {
        Note note = new Note(newNote.getTitle(), newNote.getNoteContent());
        noteRepository.save(note);
    };
    @DeleteMapping(value = "notes/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
    };
    @PutMapping(value = "notes/{id}")
    public Note editNote(@PathVariable Long id, @RequestBody Note newNote) {
        return noteRepository.findById(id).map(note -> {
            note.setTitle(newNote.getTitle());
            note.setNoteContent(newNote.getNoteContent());
            return noteRepository.save(note);
        }).orElseGet(() -> {
            newNote.setId(id);
            return noteRepository.save(newNote);
        });
    }
}
