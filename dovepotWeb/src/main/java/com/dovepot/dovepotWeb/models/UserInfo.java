package com.dovepot.dovepotWeb.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class UserInfo{
    public String id;

    public String username;

    public String name;

    private Set<String> followers;
    private Set<String> followings;

    public UserInfo(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.followers = user.getFollowers();
        this.followings = user.getFollowings();
        //System.out.println(followings);
    }

    public Set<String> getFollowers()
    {
        return this.followers;
    }

    public Set<String> getFollowings()
    {
        return this.followings;
    }

}