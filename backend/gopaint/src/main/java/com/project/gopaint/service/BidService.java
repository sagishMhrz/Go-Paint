
package com.project.gopaint.service;

import com.project.gopaint.dto.CreateBidRequest;
import com.project.gopaint.entity.Bid;
import com.project.gopaint.entity.BidStatus;
import com.project.gopaint.entity.Project;
import com.project.gopaint.entity.User;
import com.project.gopaint.repository.BidRepository;
import com.project.gopaint.repository.ProjectRepository;
import com.project.gopaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BidService {
    private final BidRepository bidRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Bid createBid(CreateBidRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User painter = userRepository.findById(request.getPainterId())
                .orElseThrow(() -> new RuntimeException("Painter not found"));

        // Check if painter already has a bid on this project
        List<Bid> existingBids = bidRepository.findByProject(project);
        for (Bid existingBid : existingBids) {
            if (existingBid.getPainter().getId().equals(painter.getId())) {
                throw new RuntimeException("You have already bid on this project!");
            }
        }

        Bid bid = new Bid();
        bid.setProject(project);
        bid.setPainter(painter);
        bid.setAmount(request.getAmount());
        bid.setTimeline(request.getTimeline());
        bid.setDescription(request.getDescription());

        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return bidRepository.findByProject(project);
    }

    public List<Bid> getBidsByPainter(Long painterId) {
        User painter = userRepository.findById(painterId)
                .orElseThrow(() -> new RuntimeException("Painter not found"));
        return bidRepository.findByPainter(painter);
    }

    public Bid acceptBid(Long bidId) {
        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));
        bid.setStatus(BidStatus.ACCEPTED);

        Project project = bid.getProject();
        project.setStatus("In Progress");
        projectRepository.save(project);

        // Reject all other bids on this project
        List<Bid> allBids = bidRepository.findByProject(project);
        for (Bid otherBid : allBids) {
            if (!otherBid.getId().equals(bidId)) {
                otherBid.setStatus(BidStatus.REJECTED);
                bidRepository.save(otherBid);
            }
        }

        return bidRepository.save(bid);
    }

    public Bid rejectBid(Long bidId) {
        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));
        bid.setStatus(BidStatus.REJECTED);
        return bidRepository.save(bid);
    }
}

