package com.zeptoneon.backend.repository;

import com.zeptoneon.backend.entity.Cart;
import com.zeptoneon.backend.entity.CartItem;
import com.zeptoneon.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    Optional<CartItem> findByIdAndCart(Long itemId, Cart cart);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
