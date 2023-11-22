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
    @Column(name = "x_position")
    private Integer x;
    @Column(name = "y_position")
    private Integer y;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"notes"})
    private User user;

    public Note(String title, String noteContent, Integer x, Integer y) {
        this.title = title;
        this.noteContent = noteContent;
        this.x = x;
        this.y = y;
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

    public Integer getX() {
        return x;
    }

    public Integer getY() {
        return y;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public void setY(Integer y) {
        this.y = y;
    }
}
