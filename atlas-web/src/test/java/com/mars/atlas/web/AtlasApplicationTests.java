package com.mars.atlas.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Import(AtlasApplication.class)
//@TestPropertySource(locations = "file:D:/JavaProjects/atlas/application.properties")
public class AtlasApplicationTests {

	@Test
	public void contextLoads() {

	}

}
