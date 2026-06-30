package com.project.gopaint.controller;

import com.project.gopaint.entity.PainterDetails;
import com.project.gopaint.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/painters")
    public ResponseEntity<?> getAllPainters() {
        try {
            List<PainterDetails> painters = userService.getAllPainters();
            return ResponseEntity.ok(painters);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
