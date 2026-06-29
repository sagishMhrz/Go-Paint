
package com.project.gopaint.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateBidRequest {
    private BigDecimal amount;
    private String timeline;
    private String description;
    private Long projectId;
    private Long painterId;
}

