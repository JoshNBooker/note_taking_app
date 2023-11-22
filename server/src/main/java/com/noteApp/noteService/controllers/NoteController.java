package com.noteApp.noteService.controllers;

import com.noteApp.noteService.repositories.NoteRepository;
import com.noteApp.noteService.models.Note;
import com.noteApp.noteService.models.User;
import com.noteApp.noteService.repositories.UserRepository;
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
    @Autowired
    UserRepository userRepository;
    @GetMapping(value = "/notes")
    public ResponseEntity<List<Note>> getAllNotesForUser(
            @RequestParam(name="email") String email){
        return new ResponseEntity<>(noteRepository.findByUserEmail(email), HttpStatus.OK);
    }
    @GetMapping(value = "/notes/{id}")
    public ResponseEntity getNote(@PathVariable Long id) {
        return new ResponseEntity<>(noteRepository.findById(id), HttpStatus.OK);
    }
    @PostMapping(value = "/notes")
    public ResponseEntity<?> createNote(@RequestBody Note newNote, @RequestParam(name = "email") String email) {
        System.out.println("new note title");
        System.out.println(newNote.getTitle());
        System.out.println("new note content");
        System.out.println(newNote.getNoteContent());
        Note note = new Note(newNote.getTitle(), newNote.getNoteContent());
        User user = userRepository.findByEmail(email);
        user.getNotes().add(note);
        note.setUser(user);
        noteRepository.save(note);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @DeleteMapping(value = "/notes/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
    };
    @PutMapping(value = "/notes/{id}")
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
