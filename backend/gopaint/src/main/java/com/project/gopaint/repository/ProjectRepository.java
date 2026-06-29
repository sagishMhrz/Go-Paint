
package com.project.gopaint.repository;

import com.project.gopaint.entity.Project;
import com.project.gopaint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
    List<Project> findByStatus(String status);
}

