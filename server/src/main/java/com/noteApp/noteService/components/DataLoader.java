package com.noteApp.noteService.components;

import com.noteApp.noteService.repositories.NoteRepository;
import com.noteApp.noteService.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import com.noteApp.noteService.models.User;
import com.noteApp.noteService.models.Note;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Profile("!test")
//@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    NoteRepository noteRepository;
    @Autowired
    UserRepository userRepository;

    public DataLoader() {

    }

    public void run (ApplicationArguments args) {
        Note note1 = new Note("Shopping list", "Peas, mint choc chip", 520, 400);
        Note note2 = new Note("Idea for a story", "A man walks into a bar", 200, 480);
        Note note3 = new Note("njkf", "neoifneowfnkew", 300, 300);
        User user1 = new User("JoshBooker","josh.booker2@gmail.com");
        user1.getNotes().add(note1);
        user1.getNotes().add(note2);
        user1.getNotes().add(note3);

        userRepository.save(user1);
        note1.setUser(user1);
        note2.setUser(user1);
        note3.setUser(user1);
        noteRepository.save(note1);
        noteRepository.save(note2);
        noteRepository.save(note3);

    }
}
