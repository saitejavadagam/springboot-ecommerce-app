package com.zeptoneon.backend.controller;

import com.zeptoneon.backend.dto.AddToCartRequest;
import com.zeptoneon.backend.dto.CartResponse;
import com.zeptoneon.backend.dto.UpdateQuantityRequest;
import com.zeptoneon.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/me")
    public ResponseEntity<CartResponse> getMyCart(Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(cartService.getCartByUserEmail(email));
    }

    @PostMapping("/me/items")
    public ResponseEntity<CartResponse> addProduct(Authentication authentication, @Valid @RequestBody AddToCartRequest request) {

        String email = authentication.getName();

        return ResponseEntity.ok(cartService.addToCart(email, request));
    }

    @PatchMapping("/me/items/{itemId}")
    public ResponseEntity<CartResponse> updateQuantity(Authentication authentication, @PathVariable Long itemId, @Valid @RequestBody UpdateQuantityRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.updateQuantity(email, itemId, request));
    }

    @DeleteMapping("/me/items/{itemId}")
    public ResponseEntity<CartResponse> removeItem(Authentication authentication, @PathVariable Long itemId){
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.removeItem(email,itemId));
    }

    @DeleteMapping("/me/items")
    public ResponseEntity<Void> clearCart(Authentication authentication){
        String email = authentication.getName();
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }

}
