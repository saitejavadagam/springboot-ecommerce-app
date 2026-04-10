package com.zeptoneon.backend.controller;

import com.zeptoneon.backend.dto.ProductPageResponse;
import com.zeptoneon.backend.dto.ProductResponse;
import com.zeptoneon.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ProductPageResponse> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(productService.getProducts(search, page, size));
    }

    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id){
        return  productService.getProductById(id);
    }

}
