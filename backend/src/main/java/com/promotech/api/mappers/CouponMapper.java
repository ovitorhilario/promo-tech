package com.promotech.api.mappers;

import com.promotech.api.domain.coupon.Coupon;
import com.promotech.api.domain.coupon.dto.CouponRequestDTO;
import com.promotech.api.domain.coupon.dto.CouponResponseDTO;
import com.promotech.api.domain.coupon.dto.CouponUpdateDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        uses = {StoreMapper.class, UserMapper.class}
)
public interface CouponMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "isExpired", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "store", ignore = true),
            @Mapping(target = "user", ignore = true),

            @Mapping(source = "title", target = "title"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "code", target = "code"),
            @Mapping(source = "link_url", target = "linkUrl")
    })
    Coupon toEntity(CouponRequestDTO dto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "title", target = "title"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "code", target = "code"),
            @Mapping(source = "linkUrl", target = "link_url"),
            @Mapping(source = "isExpired", target = "is_expired"),
            @Mapping(source = "createdAt", target = "created_at"),
            @Mapping(source = "updatedAt", target = "updated_at"),

            // this is safe, User -> UserPreviewDTO was in UserMapper
            @Mapping(source = "user", target = "user"),
            @Mapping(source = "store", target = "store")
    })
    CouponResponseDTO toDto(Coupon entity);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "store", ignore = true),
            @Mapping(target = "user", ignore = true),

            @Mapping(source = "title", target = "title"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "link_url", target = "linkUrl"),
            @Mapping(source = "code", target = "code"),
            @Mapping(source = "is_expired", target = "isExpired")
    })
    void updateEntityFromDto(CouponUpdateDTO dto, @MappingTarget Coupon entity);
}
