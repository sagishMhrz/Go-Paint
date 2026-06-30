package com.project.gopaint.dto;

import lombok.Data;
import java.util.List;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String role;
    private String city;
    private String district;
    private String addressLine;
    private List<String> specialties;
    private String experience;
    private Double priceMin;
    private Double priceMax;
    private Double rating;
    private Integer reviews;
    private Integer completedProjects;
    private boolean verified;
}