package com.dovepot.dovepotWeb.models;

public class AuthenticationBean {

    private String message;
    //constructors, getters
    public AuthenticationBean(String s)
    {
        message = s;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("HelloWorldBean [message=%s]", message);
    }
}