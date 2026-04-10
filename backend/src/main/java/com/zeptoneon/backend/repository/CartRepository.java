package com.zeptoneon.backend.repository;

import com.zeptoneon.backend.entity.Cart;
import com.zeptoneon.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {

    Optional<Cart> findByUser(User user);

}
