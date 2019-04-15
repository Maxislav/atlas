package com.mars.atlas.service.event;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DataListener;
import com.mars.atlas.service.Hashing;
import org.json.simple.JSONObject;

public class OnAuthData  implements Hashing, DataListener<OnAuthData> {
    public String hash;
    @Override
    public String getHash() {
        return this.hash;
    }

    @Override
    public void setHash(String hash) {
        this.hash = hash;
    }

    @Override
    public void onData(SocketIOClient client, OnAuthData data, AckRequest ackSender) throws Exception {
        String h = data.getHash();
        JSONObject root = new JSONObject();
        root.put("hash", h);
        JSONObject d = new JSONObject();
        d.put("name", "Oloevera");
        d.put("socket_id",  client.getSessionId());
        root.put("data", d);
        client.sendEvent("onAuth", root);
    }
}
