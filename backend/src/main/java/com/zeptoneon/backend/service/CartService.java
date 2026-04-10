package com.zeptoneon.backend.service;

import com.zeptoneon.backend.dto.AddToCartRequest;
import com.zeptoneon.backend.dto.CartItemResponse;
import com.zeptoneon.backend.dto.CartResponse;
import com.zeptoneon.backend.dto.UpdateQuantityRequest;
import com.zeptoneon.backend.entity.Cart;
import com.zeptoneon.backend.entity.CartItem;
import com.zeptoneon.backend.entity.Product;
import com.zeptoneon.backend.entity.User;
import com.zeptoneon.backend.repository.CartItemRepository;
import com.zeptoneon.backend.repository.CartRepository;
import com.zeptoneon.backend.repository.ProductRepository;
import com.zeptoneon.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    private Cart getOrCreateCart(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseGet(()->{
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    public CartResponse getCartByUserEmail(String email) {
        Cart cart = getOrCreateCart(email);
        return mapToResponse(cart);
    }

    public CartResponse addToCart(String email, AddToCartRequest request) {
        Cart cart = getOrCreateCart(email);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem =
                cartItemRepository.findByCartAndProduct(cart, product)
                        .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(request.getQuantity());
            cart.getItems().add(item);
        }

        cartRepository.save(cart);

        return mapToResponse(cart);


    }


    public CartResponse updateQuantity(String email, Long itemId, UpdateQuantityRequest request) {

        Cart cart = getOrCreateCart(email);

        CartItem item = cartItemRepository.findByIdAndCart(itemId, cart).orElseThrow(() -> new RuntimeException("Item not found"));
        if (request.getQuantity() <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(request.getQuantity());
        }

        return mapToResponse(cart);
    }

    public CartResponse removeItem(String email, Long itemId) {
        Cart cart = getOrCreateCart(email);
        CartItem item = cartItemRepository.findByIdAndCart(itemId,cart).orElseThrow(()->new RuntimeException("Item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        return mapToResponse(cart);
    }

    public void clearCart(String email) {
        Cart cart = getOrCreateCart(email);
        cart.getItems().clear();
    }

    private CartResponse mapToResponse(Cart cart) {

        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(item -> CartItemResponse.builder()
                        .itemId(item.getId())
                        .productId(item.getProduct().getId())
                        .title(item.getProduct().getTitle())
                        .image(item.getProduct().getImage())
                        .price(item.getProduct().getPrice())
                        .quantity(item.getQuantity())
                        .subTotal(item.getProduct().getPrice() * item.getQuantity())
                        .build()
                ).toList();

        double total = itemResponses.stream()
                .mapToDouble(CartItemResponse::getSubTotal)
                .sum();

        return CartResponse.builder()
                .id(cart.getId())
                .items(itemResponses)
                .totalAmount(total)
                .build();
    }

}
