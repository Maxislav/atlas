package com.mars.atlas.mysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NoteRepository extends CrudRepository<User, Long> {
    @Query(value="SELECT * FROM monitoring.user LIMIT 0, 1000",nativeQuery=true)
    public List<User> getUsers();
}

