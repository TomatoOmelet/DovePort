package com.dovepot.dovepotWeb.models;

public class MessageBean {

    private String message;
    //constructors, getters
    public MessageBean(String s)
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
        return String.format(message);
    }
}