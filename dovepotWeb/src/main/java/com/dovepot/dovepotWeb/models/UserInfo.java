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
    private Plan currentPlan;

    public UserInfo(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.followers = user.getFollowers();
        this.followings = user.getFollowings();
    }

    public UserInfo(User user, Plan plan) {
        this(user);
        if(plan != null && user.getCurrentPlanID().equals(plan.getId()))
        {
            this.currentPlan = plan;
        }
    }

    public Set<String> getFollowers()
    {
        return this.followers;
    }

    public Set<String> getFollowings()
    {
        return this.followings;
    }

    public Plan getCurrentPlan()
    {
        return this.currentPlan;
    }
}