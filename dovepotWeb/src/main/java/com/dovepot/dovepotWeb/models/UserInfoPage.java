package com.dovepot.dovepotWeb.models;

import java.util.List;

public class UserInfoPage {
    private List<UserInfo> content;
    private int totalSize;

    public UserInfoPage(List<UserInfo> content, int totalSize)
    {
        this.content = content;
        this.totalSize = totalSize;
    }

    public List<UserInfo> getContent() {
        return content;
    }

    public void setContent(List<UserInfo> content) {
        this.content = content;
    }

    public int getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(int totalSize) {
        this.totalSize = totalSize;
    }
    
}