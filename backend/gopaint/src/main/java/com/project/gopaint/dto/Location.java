package com.project.gopaint.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Embeddable
@Data
public class Location implements Serializable {
    private String city;
    private String district;
    private String addressLine;
}