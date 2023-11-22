import com.noteApp.noteService.models.Note;
import com.noteApp.noteService.models.User;
import com.noteApp.noteService.repositories.NoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@ActiveProfiles("test") //Indicates it's a test profile so will not run DataLoader
@SpringBootTest
public class NoteTests {
    @Autowired
    NoteRepository noteRepository;

    Note note;
    User user1;
    User user2;
   @BeforeEach
    public void setUp() {
        note = new Note("To do today", "get some food and say hey hi to bunce");
        user1 = new User("joshb", "josh@email.com");
        user2 = new User("bosjj", "email@email.com");


    }
    @Test
    public void canGetContents() {
        assertEquals("get some food and say hey hi to bunce", note.getNoteContent());
    }
    @Test
    public void canFindAllNotesByUserName() {
        List<Note> found = noteRepository.findByUserEmail("joshb");
        assertEquals(3, found.size());
    }
}
