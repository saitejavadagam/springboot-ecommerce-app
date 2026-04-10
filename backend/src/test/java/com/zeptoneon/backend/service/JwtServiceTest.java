package com.zeptoneon.backend.service;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails userDetails;

    private final String secret = "myVerySecretKeyThatIsAtLeast32CharactersLong!!";
    private final long expiration = 3600000;

    @BeforeEach
    void setUp(){
        jwtService = new JwtService();

        ReflectionTestUtils.setField(jwtService,"secret",secret);
        ReflectionTestUtils.setField(jwtService,"expiration",expiration);

        jwtService.init();

        userDetails = Mockito.mock(UserDetails.class);

        when(userDetails.getUsername()).thenReturn("dev_user");
    }

    @Test
    void shouldGenerateValidToken(){
        String token = jwtService.generateToken(userDetails);

        assertNotNull(token);
        assertEquals("dev_user",jwtService.extractUsername(token));
    }

    @Test
    void shouldValidateCorrectToken(){
        String token = jwtService.generateToken(userDetails);

        assertTrue(jwtService.isTokenValid(token,userDetails));
    }

    @Test
    void shouldFailValidationForDifferentUser(){
        String token = jwtService.generateToken(userDetails);

        UserDetails wrongUser = Mockito.mock(UserDetails.class);
        when(wrongUser.getUsername()).thenReturn("imposter_user");

        assertFalse(jwtService.isTokenValid(token,wrongUser));
    }

    @Test
    void shouldThrowExceptionWhenTokenIsExpired(){
        ReflectionTestUtils.setField(jwtService,"expiration",-1000L);
        jwtService.init();

        String expiredToken = jwtService.generateToken(userDetails);

        assertThrows(ExpiredJwtException.class,()->{
            jwtService.extractUsername(expiredToken);
        });
    }

}
