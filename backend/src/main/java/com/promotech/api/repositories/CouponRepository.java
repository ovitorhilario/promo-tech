package com.promotech.api.repositories;

import com.promotech.api.domain.coupon.Coupon;
import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CouponRepository extends JpaRepository<Coupon, UUID> {

    List<Coupon> findByUser(User user);

    List<Coupon> findByStore(Store store);
}
