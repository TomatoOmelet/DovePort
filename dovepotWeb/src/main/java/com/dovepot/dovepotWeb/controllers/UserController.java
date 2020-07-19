package com.dovepot.dovepotWeb.controllers;

import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class UserController {
    
    @Autowired
    UserRepository userRepository;

    @RequestMapping(method=RequestMethod.GET, value="/users")
    public Iterable<User> GetUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/users")
    public User SaveUser(@RequestBody User user) {
        userRepository.save(user);

        return user;
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
        if(user.getPhone() != null)
            c.setPhone(user.getPhone());
        if(user.getEmail() != null)
            c.setEmail(user.getEmail());
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