package com.mars.atlas.service;
import com.corundumstudio.socketio.listener.*;
import com.corundumstudio.socketio.*;
import com.mars.atlas.service.event.OnAuth;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.annotation.PostConstruct;
import java.io.PrintStream;
import java.lang.ref.PhantomReference;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.UUID;

@Service
public class MySocketService implements ConnectListener, DisconnectListener{
    HashMap<UUID, SocketUser> socketIOServerHashMap;
    // private Environment env;
    private static final Logger logger = LoggerFactory.getLogger(MySocketService.class);
    private final PrintStream printStream =  System.out;

    @Autowired
    SocketIOServer server;


    @Autowired
    SocketHash socketHash;


    public MySocketService(){
        socketIOServerHashMap = new HashMap<>();
        Oloe oloe = new Oloe();
        RSA rsa = new RSA();



        // ConfigurableEnvironment environment = applicationContext.getEnvironment();
       /* String socketPort = env.getProperty("socket.port");
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(Integer.parseInt(socketPort));

        server = new SocketIOServer(config);
        server.start();
        server.addConnectListener(this);
        server.addDisconnectListener(this);
        String s = String.format("<==== Socket started port: %s ====>",socketPort);
        System.out.println(s);
        socketIOServerHashMap = new HashMap<>();*/


        //server.addEventListener("onAuth", OnAuthData.class, new OnAuthData());


        //server.addEventListener("onAuth", OnAuthData.class, new OnAuthData());
      /*  server.addEventListener("onAuth", OnAuthData.class, new DataListener<OnAuthData>() {
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
        });*/
/*
        server.addEventListener("getUser", ChatObject.class, new DataListener<ChatObject>() {
            @Override
            public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
                SocketUser socketUser = socketIOServerHashMap.get(client.getSessionId());
                socketUser.setHash(data.getHash());
                socketUser.send("getUser");
            }
        });*/
    }

    @PostConstruct
    public void init(){
        server.addConnectListener(this);
        server.addDisconnectListener(this);
    }

    @Override
    public void onConnect(SocketIOClient client) {
        System.out.println("client connect -> id: " + client.getSessionId());
        socketHash.put(client.getSessionId(), new RSA());

    }

    @Override
    public void onDisconnect(SocketIOClient client) {
       // socketIOServerHashMap.remove(client.getSessionId());
        socketHash.remove(client.getSessionId());
    }
}
