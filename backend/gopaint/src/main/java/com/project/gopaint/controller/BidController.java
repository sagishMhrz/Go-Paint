
package com.project.gopaint.controller;

import com.project.gopaint.dto.CreateBidRequest;
import com.project.gopaint.entity.Bid;
import com.project.gopaint.service.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BidController {
    private final BidService bidService;

    @PostMapping
    public ResponseEntity<?> createBid(@RequestBody CreateBidRequest request) {
        try {
            Bid bid = bidService.createBid(request);
            return ResponseEntity.ok(bid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getBidsByProject(@PathVariable Long projectId) {
        try {
            List<Bid> bids = bidService.getBidsByProject(projectId);
            return ResponseEntity.ok(bids);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/painter/{painterId}")
    public ResponseEntity<?> getBidsByPainter(@PathVariable Long painterId) {
        try {
            List<Bid> bids = bidService.getBidsByPainter(painterId);
            return ResponseEntity.ok(bids);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{bidId}/accept")
    public ResponseEntity<?> acceptBid(@PathVariable Long bidId) {
        try {
            Bid bid = bidService.acceptBid(bidId);
            return ResponseEntity.ok(bid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{bidId}/reject")
    public ResponseEntity<?> rejectBid(@PathVariable Long bidId) {
        try {
            Bid bid = bidService.rejectBid(bidId);
            return ResponseEntity.ok(bid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

