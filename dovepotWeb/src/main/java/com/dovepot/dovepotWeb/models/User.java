package com.dovepot.dovepotWeb.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.dovepot.dovepotWeb.repositories.UserRepository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;
    private String name;
    private String password;
    private String currentPlanID;

    private Set<String> followers = new HashSet<String>();

    private Set<String> followings = new HashSet<String>();


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

    public Set<String> getFollowers()
    {
        return followers;
    }

    public void addFollower(String user)
    {
        followers.add(user);
    }

    public boolean removeFollower(String user)
    {
        if(followers.contains(user)){
            followers.remove(user);
            return true;
        }else{
            return false;
        }
    }

    public Set<String> getFollowings()
    {
        return followings;
    }

    public void addFollowing(String user)
    {
        followings.add(user);
    }

    public boolean removeFollowing(String user)
    {
        if(followings.contains(user)){
            followings.remove(user);
            return true;
        }else{
            return false;
        }
    }

    public String getCurrentPlanID()
    {
        return currentPlanID;
    }

    public void setCurrentPlanID(String id)
    {
        currentPlanID = id;
    }
}