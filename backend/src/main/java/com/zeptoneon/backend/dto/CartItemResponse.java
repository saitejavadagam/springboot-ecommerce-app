package com.zeptoneon.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponse {

    private Long itemId;
    private Long productId;
    private String title;
    private String image;
    private Double price;
    private Integer quantity;
    private Double subTotal;

}
