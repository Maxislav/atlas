package com.mars.atlas.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NoteRepository  extends JpaRepository<User, Long> {
    @Query(value="SELECT * FROM monitoring.user LIMIT 0, 1000",nativeQuery=true)
    public List<User> getUsers();
}

