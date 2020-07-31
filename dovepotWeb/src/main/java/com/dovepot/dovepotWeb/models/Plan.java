package com.dovepot.dovepotWeb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plan")
public class Plan {
    @Id
    private String id;
    private String ownerID;
    private String state;

    public Plan(String ownerID, String state) {
        this.ownerID = ownerID;
        this.state = state;
    }

    public String getOwnerID()
    {
        return ownerID;
    }

    public void setOwnerID(String ownerID)
    {
        this.ownerID = ownerID;
    }

    public String getState()
    {
        return state;
    }

    public void setState(String state)
    {
        this.state = state;
    }
}