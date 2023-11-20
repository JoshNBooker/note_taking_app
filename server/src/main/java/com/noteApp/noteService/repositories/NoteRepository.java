package com.noteApp.noteService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.noteApp.noteService.models.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
