package com.mars.atlas.service.event;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.mars.atlas.service.Hashing;
import com.mars.atlas.service.MySocketService;
import com.mars.atlas.service.RSA;
import com.mars.atlas.service.SocketHash;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class OnAuth {
    @Autowired
    SocketIOServer server;

    @Autowired
    public  SocketHash socketHash;

    public OnAuth() {

    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // server.addEventListener("onAuth", MyData.class, new MyData());
        server.addEventListener("onAuth", MyData.class, new DataListener<MyData>() {
            @Override
            public void onData(SocketIOClient client, MyData data, AckRequest ackSender) throws Exception {
                RSA rsa = socketHash.get(client.getSessionId());

                byte[] encodedPublicKey = rsa.pubKey.getEncoded();
                String b64PublicKey = Base64.getEncoder().encodeToString(encodedPublicKey);


                String h = data.getHash();
                JSONObject root = new JSONObject();
                root.put("hash", h);
                JSONObject d = new JSONObject();
                d.put("name", "Oloevera");
                d.put("pubKey", b64PublicKey);
                //d.put("socket_id", client.getSessionId());
                root.put("data", d);
                client.sendEvent("onAuth", root);
            }
        });
    }


    public OnAuth(SocketIOServer server) {
        // server.addEventListener("onAuth", MyData.class, new MyData());
    }




     public static class MyData extends Hashing {


    }
}
