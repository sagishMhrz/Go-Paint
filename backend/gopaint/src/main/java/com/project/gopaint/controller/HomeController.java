package com.project.gopaint.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to GoPaint API! Available endpoints:\n" +
               "- /api/auth/* (Authentication)\n" +
               "- /api/projects/* (Projects)\n" +
               "- /api/bids/* (Bids)\n" +
               "- /api/users/* (Users)";
    }
}