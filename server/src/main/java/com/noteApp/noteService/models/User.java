package com.noteApp.noteService.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Column
    private String email;
    @Column
    private String userName;
    @OneToMany(mappedBy = "user")
    @Column(name = "notes")
    @JsonIgnoreProperties({"user"})
    private List<Note> notes;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public User(String userName, String email) {
        this.email = email;
        this.userName = userName;
        this.notes = new ArrayList<>();
    }
    public User(){}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public Long getId() {
        return id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
