package com.dovepot.dovepotWeb.models;

import java.io.Serializable;

public class UserInfo{
    public String id;

    public String username;

    public String name;

    public UserInfo(String id, String name, String username) {
        this.id = id;
        this.name = name;
        this.username = username;
    }
}