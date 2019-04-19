package com.mars.atlas.service.event;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import org.json.simple.JSONObject;

public class OnAuth {

    public OnAuth(SocketIOServer server) {
        server.addEventListener("onAuth", MyData.class, new MyData());
    }

    static public class MyData implements DataListener<OnAuth.MyData> {
        public String hash;

        public String getHash() {
            return this.hash;
        }

        public void setHash(String hash) {
            this.hash = hash;
        }

        @Override
        public void onData(SocketIOClient client, OnAuth.MyData data, AckRequest ackSender) throws Exception {
            String h = data.getHash();
            JSONObject root = new JSONObject();
            root.put("hash", h);
            JSONObject d = new JSONObject();
            d.put("name", "Oloevera");
            d.put("socket_id", client.getSessionId());
            root.put("data", d);
            client.sendEvent("onAuth", root);
        }
    }
}
