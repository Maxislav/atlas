package com.mars.atlas.service;
import com.corundumstudio.socketio.listener.*;
import com.corundumstudio.socketio.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import sun.rmi.runtime.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintStream;
import java.util.HashMap;
import java.util.UUID;

@Service
public class MySocketService implements ConnectListener, DisconnectListener{
    HashMap<UUID, SocketUser> socketIOServerHashMap;
    // private Environment env;
    private static final Logger logger = LoggerFactory.getLogger(MySocketService.class);
    private final PrintStream printStream =  System.out;

    public MySocketService(@Autowired Environment env){
        // ConfigurableEnvironment environment = applicationContext.getEnvironment();
        String socketPort = env.getProperty("socket.port");
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(Integer.parseInt(socketPort));

        final SocketIOServer server = new SocketIOServer(config);
        server.start();
        server.addConnectListener(this);
        server.addDisconnectListener(this);
        String s = String.format("<==== Socket started port: %s ====>",socketPort);
        System.out.println(s);
        socketIOServerHashMap = new HashMap<>();


        server.addEventListener("getUser", ChatObject.class, new DataListener<ChatObject>() {
            @Override
            public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
                SocketUser socketUser = socketIOServerHashMap.get(client.getSessionId());
                socketUser.setHash(data.getHash());
                socketUser.send("getUser");
            }
        });
    }

    @Override
    public void onConnect(SocketIOClient client) {

        socketIOServerHashMap.put(client.getSessionId(), new SocketUser(client));

    }

    @Override
    public void onDisconnect(SocketIOClient client) {
        socketIOServerHashMap.remove(client.getSessionId());
    }
}
