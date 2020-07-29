package com.dovepot.dovepotWeb.controllers;

import com.dovepot.dovepotWeb.models.MessageBean;
import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.models.UserInfo;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.dovepot.dovepotWeb.utils.JwtTokenUtil;
import com.mongodb.MongoWriteException;

import org.apache.catalina.connector.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(origins={ "${databaseAddress}", "${clientAddress}" })
public class UserController {
    
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtTokenUtil jwtUtil;

    @RequestMapping(method=RequestMethod.GET, value="/search")
    public Iterable<UserInfo> SearchUsers(@Param("keyword") String keyword) {
        List<UserInfo> userInfos = new ArrayList<UserInfo>();
        Pageable page = PageRequest.of(0, 20);
        Page<User> users = userRepository.findUsernameOrNameRegexQuery("^" + keyword, page);
        for (User user : users) {
            userInfos.add(new UserInfo(user));
        }
        return userInfos;
    }

    @RequestMapping(method=RequestMethod.GET, value="/followers/{id}")
    public Iterable<UserInfo> getFollowers(@Param("entries_each_page") Integer entries_each_page, @Param("page") Integer page
                                        , @RequestHeader("${jwt.http.request.header}") String token, @PathVariable String id) {
        List<UserInfo> userInfos = new ArrayList<UserInfo>();
        page -= 1;
        page = page>0?page:0;
        User user = userRepository.findById(id).get();
        String[] followers = user.getFollowers().toArray(new String[0]);
        int init = page * entries_each_page;
        for (int x = init; x < followers.length; x++) {
            User follow = userRepository.findById(followers[x]).get();
            userInfos.add(new UserInfo(follow));
        }
        return userInfos;
    }

    @RequestMapping(method=RequestMethod.GET, value="/followings/{id}")
    public Iterable<UserInfo> getFollowings(@Param("entries_each_page") Integer entries_each_page, @Param("page") Integer page
                                        , @RequestHeader("${jwt.http.request.header}") String token, @PathVariable String id) {
        List<UserInfo> userInfos = new ArrayList<UserInfo>();
        page -= 1;
        page = page>0?page:0;
        User user = userRepository.findById(id).get();
        String[] followings = user.getFollowings().toArray(new String[0]);
        int init = page * entries_each_page;
        for (int x = init; x < followings.length; x++) {
            User following = userRepository.findById(followings[x]).get();
            userInfos.add(new UserInfo(following));
        }
        return userInfos;
    }

    @RequestMapping(method=RequestMethod.POST, value="")
    public ResponseEntity<?> SaveUser(@RequestBody User user) {
        //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        //user.setPassword(encoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch(DuplicateKeyException e){
            //MessageBean ob = new MessageBean("username already in use");
            return new ResponseEntity<>("username already in use", HttpStatus.NOT_ACCEPTABLE);
        }catch(Exception e)
        {
            //MessageBean ob = new MessageBean(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public Optional<User> GetUser(@PathVariable String id) {
        return userRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/{id}")
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

    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public String DeleteUser(@PathVariable String id) {
        Optional<User> optuser = userRepository.findById(id);
        User user = optuser.get();
        userRepository.delete(user);

        return "";
    }

    @RequestMapping(method=RequestMethod.POST, value="/follow/{id}")
    @Transactional
    public ResponseEntity<?> FollowUser(@PathVariable String id, @RequestHeader("${jwt.http.request.header}") String token) { 
        try{
            Optional<User> userToFollowOP = userRepository.findById(id);
            User userToFollow = userToFollowOP.get();
            User userFollower = getUserFromToken(token);
            if(userFollower.getId().equals(userToFollow.getId()))
            {
                return new ResponseEntity<>("You cannot follow yourself", HttpStatus.BAD_REQUEST);
            }
            userFollower.addFollowing(userToFollow.getId());
            userToFollow.addFollower(userFollower.getId());
            userRepository.save(userToFollow);
            userRepository.save(userFollower);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e)
        {
            System.out.println("Error: " + e.getMessage());
            //MessageBean ob = new MessageBean(e.getMessage());
            return new ResponseEntity<>("An unknown error occurs, please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    @RequestMapping(method=RequestMethod.POST, value="/unfollow/{id}")
    @Transactional
    public ResponseEntity<?> UnfollowUser(@PathVariable String id, @RequestHeader("${jwt.http.request.header}") String token) { 
        try{
            Optional<User> userToUnfollowOP = userRepository.findById(id);
            User userToUnfollow = userToUnfollowOP.get();
            User userFollower = getUserFromToken(token);
            if(userFollower.getId().equals(userToUnfollow.getId()))
            {
                return new ResponseEntity<>("You cannot unfollow yourself", HttpStatus.BAD_REQUEST);
            }
            userFollower.removeFollowing(userToUnfollow.getId());
            userToUnfollow.removeFollower(userFollower.getId());
            userRepository.save(userToUnfollow);
            userRepository.save(userFollower);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e)
        {
            System.out.println("Error: " + e.getMessage());
            //MessageBean ob = new MessageBean(e.getMessage());
            return new ResponseEntity<>("An unknown error occurs, please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }

    private User getUserFromToken(String token)
    {
        token = token.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        return user;
    }
}