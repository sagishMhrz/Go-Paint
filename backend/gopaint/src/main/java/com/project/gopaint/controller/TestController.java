package com.project.gopaint.controller;

import com.project.gopaint.data.UserRole;
import com.project.gopaint.entity.Bid;
import com.project.gopaint.entity.PainterDetails;
import com.project.gopaint.entity.Project;
import com.project.gopaint.entity.User;
import com.project.gopaint.repository.BidRepository;
import com.project.gopaint.repository.PainterDetailsRepository;
import com.project.gopaint.repository.ProjectRepository;
import com.project.gopaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final UserRepository userRepository;
    private final PainterDetailsRepository painterDetailsRepository;
    private final BidRepository bidRepository;
    private final ProjectRepository projectRepository;

    @GetMapping("/users")
    public String listAllUsers() {
        System.out.println("=== All Users ===");
        List<User> users = userRepository.findAll();
        for (User user : users) {
            System.out.println("User ID: " + user.getId() + ", Name: " + user.getFullName() + ", Role: " + user.getRole());
        }
        return "Users logged to console";
    }

    @GetMapping("/painters")
    public String listAllPainters() {
        System.out.println("=== All Painters ===");
        List<User> painters = userRepository.findByRole(UserRole.PAINTER);
        for (User painter : painters) {
            System.out.println("Painter ID: " + painter.getId() + ", Name: " + painter.getFullName());
            PainterDetails details = painterDetailsRepository.findByUserId(painter.getId()).orElse(null);
            System.out.println("  PainterDetails: " + (details != null ? "Found" : "Not found"));
        }
        return "Painters logged to console";
    }

    @GetMapping("/bids")
    public String listAllBids() {
        System.out.println("=== All Bids ===");
        List<Bid> bids = bidRepository.findAll();
        for (Bid bid : bids) {
            System.out.println("Bid ID: " + bid.getId() + ", Painter: " + bid.getPainter().getFullName() + 
                             ", Project: " + bid.getProject().getTitle() + ", Status: " + bid.getStatus());
        }
        return "Bids logged to console";
    }

    @GetMapping("/projects")
    public String listAllProjects() {
        System.out.println("=== All Projects ===");
        List<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            System.out.println("Project ID: " + project.getId() + ", Title: " + project.getTitle() + 
                             ", Status: " + project.getStatus() + ", User: " + project.getUser().getFullName());
        }
        return "Projects logged to console";
    }

    @GetMapping("/assigned-projects/{painterId}")
    public String testAssignedProjects(@PathVariable Long painterId) {
        System.out.println("=== Testing Assigned Projects for Painter ID: " + painterId + " ===");
        User painter = userRepository.findById(painterId).orElse(null);
        if (painter == null) {
            System.out.println("Painter not found!");
            return "Painter not found";
        }
        System.out.println("Found painter: " + painter.getFullName());
        
        List<Bid> acceptedBids = bidRepository.findByPainterAndStatus(painter, com.project.gopaint.entity.BidStatus.ACCEPTED);
        System.out.println("Found " + acceptedBids.size() + " accepted bids");
        for (Bid bid : acceptedBids) {
            System.out.println("  Bid ID: " + bid.getId() + ", Project: " + bid.getProject().getTitle());
        }
        
        List<Project> projects = acceptedBids.stream().map(Bid::getProject).toList();
        System.out.println("Returning " + projects.size() + " projects");
        
        return "Test completed - check console logs";
    }
}