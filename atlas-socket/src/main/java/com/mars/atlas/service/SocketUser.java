package com.mars.atlas.service;

import com.corundumstudio.socketio.SocketIOClient;
import org.json.simple.JSONObject;
import org.springframework.scheduling.annotation.Async;

import java.util.UUID;

public class SocketUser {

    public UUID sessionId;
    private SocketIOClient client;
    private String hash;
    public SocketUser(SocketIOClient client){
        this.client = client;
        sessionId = client.getSessionId();
    }











}
