package com.zeptoneon.backend.controller;

import com.zeptoneon.backend.dto.AuthResponse;
import com.zeptoneon.backend.dto.LoginRequest;
import com.zeptoneon.backend.dto.SignupRequest;
import com.zeptoneon.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(request));

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        String jwt =  authService.login(request);

        return ResponseEntity.ok(new AuthResponse(jwt));

    }

}