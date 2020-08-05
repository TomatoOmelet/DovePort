package com.dovepot.dovepotWeb.models;

import java.util.List;

public class UserInfoPage {
    private List<UserInfo> content;
    private int maxSize;

    public UserInfoPage(List<UserInfo> content, int maxSize)
    {
        this.content = content;
        this.maxSize = maxSize;
    }

    public List<UserInfo> getContent() {
        return content;
    }

    public void setContent(List<UserInfo> content) {
        this.content = content;
    }

    public int getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(int maxSize) {
        this.maxSize = maxSize;
    }
    
}