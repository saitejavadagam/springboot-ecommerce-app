package com.zeptoneon.backend.dto;

public record SignupRequest(
        String email,
        String password,
        String firstname,
        String lastname
) {}
