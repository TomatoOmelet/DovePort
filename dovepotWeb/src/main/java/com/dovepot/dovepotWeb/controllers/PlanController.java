package com.dovepot.dovepotWeb.controllers;

import java.util.Optional;

import com.dovepot.dovepotWeb.models.Plan;
import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.repositories.PlanRepository;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.dovepot.dovepotWeb.utils.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/plans")
@CrossOrigin(origins={ "${databaseAddress}", "${clientAddress}" })
public class PlanController {
    @Autowired
    PlanRepository planRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtTokenUtil jwtUtil;

    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public Optional<Plan> getPlan(@PathVariable String id) {
        return planRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.POST, value="")
    public ResponseEntity<?> addPlan(@RequestBody Plan plan, @RequestHeader("${jwt.http.request.header}") String token) {
        try{
            User user = ControllerUtility.getUserFromToken(jwtUtil, userRepository, token);
            if(user.getCurrentPlanID() == null || user.getCurrentPlanID().isEmpty())
            {
                plan.setOwnerID(user.getId());
                plan.setState("active");
                Plan planData = planRepository.save(plan);
                //System.out.println(planData.getId());
                user.setCurrentPlanID(planData.getId());
                userRepository.save(user);
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
            }else{
                return new ResponseEntity<>("User already have a plan.", HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e)
        {
            //MessageBean ob = new MessageBean(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }


}