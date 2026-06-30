package com.project.gopaint.service;

import com.project.gopaint.data.UserRole;
import com.project.gopaint.dto.Location;
import com.project.gopaint.dto.RegisterRequest;
import com.project.gopaint.entity.PainterDetails;
import com.project.gopaint.entity.User;
import com.project.gopaint.repository.PainterDetailsRepository;
import com.project.gopaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PainterDetailsRepository painterDetailsRepository;

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(UserRole.valueOf(request.getRole().toUpperCase()));

        Location location = new Location();
        location.setCity(request.getCity());
        location.setDistrict(request.getDistrict());
        location.setAddressLine(request.getAddressLine());
        user.setLocation(location);

        User savedUser = userRepository.save(user);

        // If painter, save painter details too
        if (savedUser.getRole() == UserRole.PAINTER) {
            PainterDetails details = new PainterDetails();
            details.setUser(savedUser);
            details.setSpecialties(request.getSpecialties());
            details.setExperience(request.getExperience());
            details.setPriceMin(request.getPriceMin() != null ? request.getPriceMin() : 0.0);
            details.setPriceMax(request.getPriceMax() != null ? request.getPriceMax() : 0.0);
            details.setRating(request.getRating() != null ? request.getRating() : 0.0);
            details.setReviews(request.getReviews() != null ? request.getReviews() : 0);
            details.setCompletedProjects(request.getCompletedProjects() != null ? request.getCompletedProjects() : 0);
            details.setIsVerified(true);
            painterDetailsRepository.save(details);
        }

        return savedUser;
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPasswordHash().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public List<PainterDetails> getAllPainters() {
        List<User> painters = userRepository.findByRole(UserRole.PAINTER);
        System.out.println("Found " + painters.size() + " users with PAINTER role");
        List<PainterDetails> painterDetailsList = painters.stream()
                .map(user -> {
                    System.out.println("Looking for PainterDetails for user: " + user.getId() + " - " + user.getFullName());
                    PainterDetails details = painterDetailsRepository.findByUserId(user.getId()).orElse(null);
                    if (details == null) {
                        System.out.println("No PainterDetails found for user: " + user.getId() + ". Creating default...");
                        details = new PainterDetails();
                        details.setUser(user);
                        details.setSpecialties(new java.util.ArrayList<>());
                        details.setExperience("");
                        details.setPriceMin(0.0);
                        details.setPriceMax(0.0);
                        details.setRating(0.0);
                        details.setReviews(0);
                        details.setCompletedProjects(0);
                        details.setIsVerified(false);
                        details.setIsAvailable(true);
                        details = painterDetailsRepository.save(details);
                        System.out.println("Created PainterDetails for user: " + user.getId());
                    }
                    // Ensure non-null values for boolean fields
                    if (details.getIsVerified() == null) {
                        details.setIsVerified(false);
                    }
                    if (details.getIsAvailable() == null) {
                        details.setIsAvailable(true);
                    }
                    return details;
                })
                .collect(Collectors.toList());
        System.out.println("Returning " + painterDetailsList.size() + " PainterDetails");
        return painterDetailsList;
    }
}