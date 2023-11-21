package com.noteApp.noteService.controllers;

import com.noteApp.noteService.models.User;
import com.noteApp.noteService.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;
    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/users/{id}")
    public ResponseEntity getUser(@PathVariable Long id) {
        return new ResponseEntity<>(userRepository.findById(id), HttpStatus.OK);
    }
    @PostMapping(value = "/users")
    public void createUser(@RequestBody User newUser) {
        User user = new User(newUser.getUserName(), newUser.getEmail());
        userRepository.save(user);
    };
    @DeleteMapping(value = "users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    };
    @PutMapping(value = "users/{id}")
    public User editNote(@PathVariable Long id, @RequestBody User newUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(newUser.getUserName());
            return userRepository.save(user);
        }).orElseGet(() -> {
            newUser.setId(id);
            return userRepository.save(newUser);
        });
    }
}