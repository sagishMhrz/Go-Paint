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
}