package com.dovepot.dovepotWeb.controllers;

import com.dovepot.dovepotWeb.models.AuthenticationBean;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class BasicAuthenticationController {

    @GetMapping(path = "/basicauth")
    public AuthenticationBean authenticate() {
        //No authenticate logic here since Spring security already checked that before this link can be accessed
        return new AuthenticationBean("You are authenticated");
    }   
}