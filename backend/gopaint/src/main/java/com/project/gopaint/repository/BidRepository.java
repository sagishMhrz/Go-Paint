
package com.project.gopaint.repository;

import com.project.gopaint.entity.Bid;
import com.project.gopaint.entity.BidStatus;
import com.project.gopaint.entity.Project;
import com.project.gopaint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByProject(Project project);
    List<Bid> findByPainter(User painter);
    List<Bid> findByPainterAndStatus(User painter, BidStatus status);
}

