package com.mars.atlas.web;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.mars.atlas")
public class AtlasApplication {

	public static void main(String[] args) {
		SpringApplication.run(AtlasApplication.class, args);
	}
}
