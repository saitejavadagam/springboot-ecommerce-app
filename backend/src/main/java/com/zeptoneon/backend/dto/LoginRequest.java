package com.zeptoneon.backend.dto;

public record LoginRequest(
        String email,
        String password
){}
