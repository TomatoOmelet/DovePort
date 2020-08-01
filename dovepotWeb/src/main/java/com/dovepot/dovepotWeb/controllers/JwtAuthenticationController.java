package com.dovepot.dovepotWeb.controllers;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import com.dovepot.dovepotWeb.models.JwtRequest;
import com.dovepot.dovepotWeb.models.JwtResponse;
import com.dovepot.dovepotWeb.models.Plan;
import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.models.UserInfo;
import com.dovepot.dovepotWeb.repositories.PlanRepository;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.dovepot.dovepotWeb.secruity.AuthenticationException;
import com.dovepot.dovepotWeb.utils.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins={ "${databaseAddress}", "${clientAddress}" })
public class JwtAuthenticationController {

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private UserDetailsService jwtInMemoryUserDetailsService;

  @Autowired
  private UserRepository UserRepository;

  @Autowired
  private PlanRepository planRepository;

  @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
      throws AuthenticationException {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, tokenToUserInfo(token)));
  }

  @RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);

    if (jwtTokenUtil.canTokenBeRefreshed(token)) {
      String refreshedToken = jwtTokenUtil.refreshToken(token);
      return ResponseEntity.ok(new JwtResponse(refreshedToken, tokenToUserInfo(refreshedToken)));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @RequestMapping(value = "${jwt.access.token.uri}", method = RequestMethod.GET)
  public ResponseEntity<?> accessToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);

    if (jwtTokenUtil.isTokenValid(token)) {
      return ResponseEntity.ok(new JwtResponse(token, tokenToUserInfo(token)));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @ExceptionHandler({ AuthenticationException.class })
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);
    
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new AuthenticationException("User disabled", e);
    } catch (BadCredentialsException e) {
      throw new AuthenticationException("Username or password is incorrect", e);
    }
  }

  private UserInfo tokenToUserInfo(String token)
  {
    String username = jwtTokenUtil.getUsernameFromToken(token);
    User user = UserRepository.findByUsername(username);
    UserInfo userInfo;
    if(user.getCurrentPlanID()!=null)
    {
        Plan plan = planRepository.findById(user.getCurrentPlanID()).get();
        userInfo = new UserInfo(user, plan);
    }else{
        userInfo = new UserInfo(user);
    }
    return userInfo;
  }
}
