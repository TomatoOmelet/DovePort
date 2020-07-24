package com.dovepot.dovepotWeb.controllers;

import com.dovepot.dovepotWeb.models.MessageBean;
import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.mongodb.MongoWriteException;

import org.apache.catalina.connector.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
public class UserController {
    
    @Autowired
    UserRepository userRepository;

    @RequestMapping(method=RequestMethod.GET, value="/users")
    public Iterable<User> GetUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/users")
    public ResponseEntity<?> SaveUser(@RequestBody User user) {
        //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        //user.setPassword(encoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch(DuplicateKeyException e){
            MessageBean ob = new MessageBean("username already in use");
            return new ResponseEntity<>(ob, HttpStatus.NOT_ACCEPTABLE);
        }catch(Exception e)
        {
            MessageBean ob = new MessageBean(e.getMessage());
            return new ResponseEntity<>(ob, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @RequestMapping(method=RequestMethod.GET, value="/users/{id}")
    public Optional<User> GetUser(@PathVariable String id) {
        return userRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/users/{id}")
    public User UpdateUser(@PathVariable String id, @RequestBody User user) {
        Optional<User> optuser = userRepository.findById(id);
        User c = optuser.get();
        if(user.getName() != null)
            c.setName(user.getName());
        if(user.getPassword() != null)
            c.setPassword(user.getPassword());
        if(user.getUsername() != null)
            c.setUsername(user.getUsername());
        userRepository.save(c);
        return c;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/users/{id}")
    public String DeleteUser(@PathVariable String id) {
        Optional<User> optuser = userRepository.findById(id);
        User user = optuser.get();
        userRepository.delete(user);

        return "";
    }
}