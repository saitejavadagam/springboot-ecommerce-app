package com.zeptoneon.backend.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private Double totalAmount;
}
