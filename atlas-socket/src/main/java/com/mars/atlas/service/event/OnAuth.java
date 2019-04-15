package com.mars.atlas.service.event;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.mars.atlas.service.Hashing;
import com.mars.atlas.service.User;
import org.json.simple.JSONObject;

public class OnAuth extends User implements DataListener<OnAuthData> {


    private  String eName = "onAuth";
    public OnAuth(SocketIOServer server, SocketIOClient client) {
        super(server, client);
        server.addEventListener(eName, OnAuthData.class, this);
    }


    @Override
    public void onData(SocketIOClient client, OnAuthData data, AckRequest ackSender) throws Exception {
        String h = data.getHash();
        JSONObject root = new JSONObject();
        root.put("hash", h);
        JSONObject d = new JSONObject();
        d.put("name", "Oloevera");
        d.put("socket_id",  this.client.getSessionId());
        root.put("data", d);
        this.client.sendEvent(eName, root);
    }





}
