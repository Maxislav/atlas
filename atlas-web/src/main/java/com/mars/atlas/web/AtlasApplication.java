package com.mars.atlas.web;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

@SpringBootApplication(scanBasePackages = "com.mars.atlas.*")
public class AtlasApplication {

	public static void main(String[] args) {

		ConfigurableApplicationContext applicationContext = new SpringApplicationBuilder(AtlasApplication.class)
				.properties("spring.config.location:file:./application.properties")
				.build().run(args);

		ConfigurableEnvironment environment = applicationContext.getEnvironment();
		String s = String.format("<==== Server started port: %s ====>", environment.getProperty("server.port"));
		System.out.println(s);
		//SpringApplication.run(AtlasApplication.class, args);
	}
}
