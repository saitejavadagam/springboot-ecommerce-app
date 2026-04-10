package com.zeptoneon.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.zeptoneon.backend.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
