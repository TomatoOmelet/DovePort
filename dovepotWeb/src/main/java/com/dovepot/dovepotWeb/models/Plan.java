package com.dovepot.dovepotWeb.models;

import com.mongodb.lang.NonNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plan")
public class Plan {
    @Id
    private String id;
    @NonNull
    private String ownerID;
    @NonNull
    private String state;
    @NonNull
    private String content;
    @NonNull
    private String deadline;

    public Plan(final String ownerID, String content, String deadline,  final String state) {
        this.content = content;
        this.deadline = deadline;
        this.ownerID = ownerID;
        this.state = state;
    }

    public String getOwnerID()
    {
        return ownerID;
    }

    public void setOwnerID(final String ownerID)
    {
        this.ownerID = ownerID;
    }

    public String getState()
    {
        return state;
    }

    public void setState(final String state)
    {
        this.state = state;
    }

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    
}