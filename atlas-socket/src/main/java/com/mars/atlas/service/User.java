package com.mars.atlas.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;

public class User implements Hashing {
    public SocketIOClient client;
    public SocketIOServer server;
    String hash;
    public User(SocketIOServer server, SocketIOClient client){
        this.server = server;
        this.client = client;
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
