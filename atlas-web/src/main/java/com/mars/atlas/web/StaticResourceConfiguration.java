package com.mars.atlas.web;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableJpaRepositories("com.mars.atlas.*")
@EntityScan("com.mars.atlas.*")
//@PropertySource(value = "file:application.properties")
public class StaticResourceConfiguration implements WebMvcConfigurer {

    @Autowired Environment env;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("resources/static/**");
    }

    @Bean(initMethod = "start")
    public SocketIOServer getSocketIOServer() {

        String socketPort = env.getProperty("socket.port");
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname("localhost");
        config.setPort(Integer.parseInt(socketPort));
        return new SocketIOServer(config);

    }
}