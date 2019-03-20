package com.mars.atlas.web;
import com.mars.atlas.jpa.NoteRepository;
import com.mars.atlas.jpa.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;


@Controller
public class IndexController {

   /* @Autowired
    NoteRepository noteRepository;*/

    TestService testService;


    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String getAll( Map<String, Object> model) {
        // log.info("Sending request to get all reports");
        // List<String> reports = reportService.getAppList();
        // reports.add(Report.builder().id("1").name("name_1").build());
        // reports.add(Report.builder().id("2").name("name_2").build());
        //model.put("list", reports);
//     List<User> u = noteRepository.getUsers();

        return "index";
    }
}
