package com.promotech.api.services;

import com.promotech.api.domain.coupon.Coupon;
import com.promotech.api.domain.coupon.dto.CouponRequestDTO;
import com.promotech.api.domain.coupon.dto.CouponResponseDTO;
import com.promotech.api.domain.coupon.dto.CouponUpdateDTO;
import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.user.User;
import com.promotech.api.mappers.CouponMapper;
import com.promotech.api.repositories.CouponRepository;
import com.promotech.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoreService storeService;

    @Autowired
    private CouponMapper mapper;

    public Optional<CouponResponseDTO> create(CouponRequestDTO dto, User user) throws IllegalArgumentException {
        Store store = storeService.getById(dto.store_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid store UUID")
        );

        Coupon coupon = mapper.toEntity(dto);
        coupon.setUser(user);
        coupon.setStore(store);
        coupon.setIsExpired(false);

        return Optional.ofNullable(mapper.toDto(couponRepository.save(coupon)));
    }

    public void delete(UUID couponId, User user) {
        Coupon coupon = couponRepository.findById(couponId).orElseThrow();

        if (this.belongsToUser(user, coupon) || user.isAdmin()) {
            couponRepository.deleteById(couponId);
        }
    }

    public Optional<CouponResponseDTO> update(CouponUpdateDTO dto, UUID couponId, User user) throws IllegalArgumentException, IllegalAccessException
    {
        Coupon coupon = couponRepository.findById(couponId).orElseThrow(
                () -> new IllegalArgumentException("Invalid coupon UUID")
        );
        Store store = storeService.getById(dto.store_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid store UUID")
        );
        if (!this.belongsToUser(user, coupon)) {
            throw new IllegalAccessException("Coupon dont belongs to user");
        }
        mapper.updateEntityFromDto(dto, coupon);
        coupon.setStore(store);

        return Optional.ofNullable(mapper.toDto(couponRepository.save(coupon)));
    }

    public List<CouponResponseDTO> listAll() {
        return couponRepository.findAll(sortByCreation())
                .stream().map(mapper::toDto).toList();
    }

    public List<CouponResponseDTO> listFromUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow();
        return couponRepository.findByUser(user).stream().map(mapper::toDto).toList();
    }

    private boolean belongsToUser(User user, Coupon coupon) {
        UUID couponUserId = coupon.getUser().getId();
        return user.getId().equals(couponUserId);
    }

    private Sort sortByCreation() {
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }
}
