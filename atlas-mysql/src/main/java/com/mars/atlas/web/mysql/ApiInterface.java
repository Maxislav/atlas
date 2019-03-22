package com.mars.atlas.web.mysql;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApiInterface extends CrudRepository<User, Long> {
    @Query(value="SELECT * FROM monitoring.user LIMIT 0, 1000",nativeQuery=true)
    public List<User> getUsers();
}
