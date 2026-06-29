package com.project.gopaint.repository;

import com.project.gopaint.entity.PainterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PainterDetailsRepository extends JpaRepository<PainterDetails, Long> {
    Optional<PainterDetails> findByUserId(Long userId);
}