import com.noteApp.noteService.models.Note;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class NoteTest {
    Note note;
   @BeforeEach
    public void setUp() {
        note = new Note("To do today", "get some food and say hey hi to bunce");
    }
    @Test
    public void canGetContents() {
        assertEquals("get some food and say hey hi to bunce", note.getNoteContent());
    }
}
