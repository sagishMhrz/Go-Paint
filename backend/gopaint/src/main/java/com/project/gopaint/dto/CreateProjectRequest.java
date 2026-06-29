
package com.project.gopaint.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateProjectRequest {
    private String title;
    private String location;
    private String budget;
    private String timeline;
    private List<String> rooms;
    private String description;
    private Long userId;
}

