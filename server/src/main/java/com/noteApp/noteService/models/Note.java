package com.noteApp.noteService.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String noteContent;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"notes"})
    private User user;

    public Note(String title, String noteContent) {
        this.title = title;
        this.noteContent = noteContent;
    }

    public Note(){}

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public String getNoteContent() {
        return noteContent;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }
}
