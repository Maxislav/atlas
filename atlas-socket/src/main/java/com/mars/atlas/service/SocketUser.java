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

    @Async
    public void send(String eName) throws InterruptedException {
        JSONObject root = new JSONObject();
        root.put("hash", this.hash);
        JSONObject data = new JSONObject();
        data.put("name", "Oloevera");
        root.put("data", data);
        Thread.sleep(1000);
        this.client.sendEvent(eName, root);
    }

    public void setHash(String hash) {
        this.hash = hash;
    }






}
