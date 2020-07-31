package com.dovepot.dovepotWeb.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(origins={ "${databaseAddress}", "${clientAddress}" })
public class PlanController {
    
}