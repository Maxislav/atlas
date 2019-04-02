package com.mars.atlas.service;

public class ChatObject implements Hashing {

    private String userName;
    private String message;



    private String hash;

    public ChatObject() {
    }

    public ChatObject(String userName, String message) {
        super();
        this.userName = userName;
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }


    @Override
    public String getHash() {
        return this.hash;
    }

    @Override
    public void setHash(String hash) {
          this.hash = hash;

    }
}