package com.mars.atlas.service;
import com.corundumstudio.socketio.listener.*;
import com.corundumstudio.socketio.*;
import org.springframework.stereotype.Service;

@Service
public class MySocketService {
    public MySocketService(){
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);

        final SocketIOServer server = new SocketIOServer(config);
        server.start();
    }
}
