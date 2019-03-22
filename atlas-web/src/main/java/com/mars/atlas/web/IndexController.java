package com.mars.atlas.web;
//import com.mars.atlas.jpa.NoteRepository;

import com.mars.atlas.mysql.ApiInterface;
import com.mars.atlas.mysql.User;
import com.mars.atlas.service.MySocketService;
import com.mars.atlas.mysql.TestService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Controller
public class IndexController {
/*
    @Autowired
    NoteRepository noteRepository;*/

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private TestService2 testService;

    @Autowired
    MySocketService mySocketService;

    @Autowired
    ApiInterface apiInterface;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getAll(Map<String, Object> model) {
        // log.info("Sending request to get all reports");
        // List<String> reports = reportService.getAppList();
        // reports.add(Report.builder().id("1").name("name_1").build());
        // reports.add(Report.builder().id("2").name("name_2").build());
        //model.put("list", reports);
        //   List<User> u = noteRepository.getUsers();
        List<User> userList = jdbcTemplate.query("SELECT * FROM monitoring.user LIMIT 0, 1000", new RowMapperResultSetExtractor<User>(new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = new User();
                user.id = rs.getLong("id");
                user.name = rs.getString("name");
                return user;
            }
        }));

        userList = apiInterface.getUsers();

       /* SqlParameterSource paramSource = new MapSqlParameterSource().addValue("user", "FIO");
        return getNamedParameterJdbcTemplate().query("select where user = :user", paramSource,  new ClientNegotiationMapper());*/
        return "index";
    }
}
