package com.dovepot.dovepotWeb.controllers;

import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.dovepot.dovepotWeb.utils.JwtTokenUtil;

public class ControllerUtility {
    public static User getUserFromToken(JwtTokenUtil jwtUtil, UserRepository userRepository, String token)
    {
        token = token.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        return user;
    }
}