package com.zeptoneon.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.zeptoneon.backend.dto.ProductPageResponse;
import com.zeptoneon.backend.dto.ProductResponse;
import com.zeptoneon.backend.entity.Product;
import com.zeptoneon.backend.repository.ProductRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductPageResponse getProducts(String search, int page, int size)
    {
        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage;

        if(search == null || search.isBlank()){
            productPage = productRepository.findAll(pageable);
        } else {
            productPage = productRepository.findByTitleContainingIgnoreCase(search, pageable);
        }

        return new ProductPageResponse(
                productPage.stream().map(this::mapToResponse).toList(),
                productPage.getNumber(),
                productPage.getTotalPages(),
                productPage.getTotalElements()
        );
    }

    public ProductResponse getProductById(Long id) {
        Product product =  productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Product not found"));

        return mapToResponse(product);
    }

    private ProductResponse mapToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .mrp(product.getMrp())
                .rating(product.getRating())
                .reviews(product.getReviews())
                .bought(product.getBought())
                .sponsored(product.getSponsored())
                .image(product.getImage())
                .build();
    }



}
