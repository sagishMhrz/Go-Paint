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
}