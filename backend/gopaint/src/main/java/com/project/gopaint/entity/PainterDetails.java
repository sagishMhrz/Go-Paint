package com.project.gopaint.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "painter_details")
@Data
public class PainterDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DETAILS_ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @ElementCollection
    @CollectionTable(name = "painter_specialties", joinColumns = @JoinColumn(name = "DETAILS_ID"))
    @Column(name = "SPECIALTY")
    private List<String> specialties;

    @Column(name = "EXPERIENCE")
    private String experience;

    @Column(name = "HOURLY_RATE")
    private Double hourlyRate;

    @Column(name = "ABOUT", columnDefinition = "TEXT")
    private String about;

    @Column(name = "IS_AVAILABLE")
    private boolean isAvailable = true;

    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}