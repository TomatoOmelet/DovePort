package com.dovepot.dovepotWeb.models;

import java.util.ArrayList;
import java.util.List;

import com.dovepot.dovepotWeb.repositories.UserRepository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    private String name;
    private String password;

    @DBRef
    private List<User> followers = new ArrayList<User>();
    
    @DBRef
    private List<User> followings = new ArrayList<User>();


    public User() {
    }

    public User(String name, String password, String username) {
        this.name = name;
        this.password = password;
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<User> getFollowers()
    {
        return followers;
    }

    public void addFollower(User user)
    {
        followers.add(user);
    }

    public boolean removeFollower(User user)
    {
        if(followers.contains(user)){
            followers.remove(user);
            return true;
        }else{
            return false;
        }
    }

    public List<User> getFollowings()
    {
        return followings;
    }

    public void addFollowing(User user)
    {
        followings.add(user);
    }

    public boolean removeFollowing(User user)
    {
        if(followings.contains(user)){
            followings.remove(user);
            return true;
        }else{
            return false;
        }
    }
}