
package com.project.gopaint.service;

import com.project.gopaint.dto.CreateProjectRequest;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final BidRepository bidRepository;

    public Project createProject(CreateProjectRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setLocation(request.getLocation());
        project.setBudget(request.getBudget());
        project.setTimeline(request.getTimeline());
        project.setRooms(request.getRooms());
        project.setDescription(request.getDescription());
        project.setUser(user);

        return projectRepository.save(project);
    }

    public List<Project> getProjectsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return projectRepository.findByUser(user);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findByStatus("Bidding");
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public List<Project> getAssignedProjectsForPainter(Long painterId) {
        User painter = userRepository.findById(painterId)
                .orElseThrow(() -> new RuntimeException("Painter not found"));

        List<Bid> acceptedBids = bidRepository.findByPainterAndStatus(painter, BidStatus.ACCEPTED);

        return acceptedBids.stream()
                .map(Bid::getProject)
                .collect(Collectors.toList());
    }

    public Project updateProject(Long projectId, CreateProjectRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(request.getTitle());
        project.setLocation(request.getLocation());
        project.setBudget(request.getBudget());
        project.setTimeline(request.getTimeline());
        project.setRooms(request.getRooms());
        project.setDescription(request.getDescription());

        return projectRepository.save(project);
    }

    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.delete(project);
    }
}

