package com.promotech.api.mappers;

import com.promotech.api.domain.promotion.Promotion;
import com.promotech.api.domain.promotion.dto.PromotionRequestDTO;
import com.promotech.api.domain.promotion.dto.PromotionResponseDTO;
import com.promotech.api.domain.promotion.dto.PromotionUpdateDTO;
import org.mapstruct.*;

@Mapper(
		componentModel = MappingConstants.ComponentModel.SPRING,
		unmappedTargetPolicy = ReportingPolicy.ERROR,
		uses = {StoreMapper.class, CategoryMapper.class, UserMapper.class}
)
public interface PromotionMapper {

	@Mappings({
			@Mapping(target = "id", ignore = true),
			@Mapping(target = "isExpired", ignore = true),
			@Mapping(target = "createdAt", ignore = true),
			@Mapping(target = "updatedAt", ignore = true),
			@Mapping(target = "store", ignore = true),
			@Mapping(target = "category", ignore = true),
			@Mapping(target = "user", ignore = true),

			@Mapping(source = "title", target = "title"),
			@Mapping(source = "description", target = "description"),
			@Mapping(source = "price", target = "price"),
			@Mapping(source = "img_url", target = "imgUrl"),
			@Mapping(source = "link_url", target = "linkUrl")
	})
	Promotion toEntity(PromotionRequestDTO dto);

	@Mappings({
			@Mapping(source = "id", target = "id"),
			@Mapping(source = "title", target = "title"),
			@Mapping(source = "description", target = "description"),
			@Mapping(source = "imgUrl", target = "img_url"),
			@Mapping(source = "linkUrl", target = "link_url"),
			@Mapping(source = "price", target = "price"),
			@Mapping(source = "category", target = "category"),
			@Mapping(source = "createdAt", target = "created_at"),
			@Mapping(source = "updatedAt", target = "updated_at"),

			// this is safe, User -> UserPreviewDTO was in UserMapper
			@Mapping(source = "user", target = "user"),
			@Mapping(source = "store", target = "store")
	})
	PromotionResponseDTO toDto(Promotion entity);

	@Mappings({
			@Mapping(target = "id", ignore = true),
			@Mapping(target = "store", ignore = true),
			@Mapping(target = "category", ignore = true),
			@Mapping(target = "user", ignore = true),
			@Mapping(target = "createdAt", ignore = true),
			@Mapping(target = "updatedAt", ignore = true),

			@Mapping(source = "title", target = "title"),
			@Mapping(source = "description", target = "description"),
			@Mapping(source = "price", target = "price"),
			@Mapping(source = "img_url", target = "imgUrl"),
			@Mapping(source = "link_url", target = "linkUrl"),
			@Mapping(source = "is_expired", target = "isExpired")
	})
	void updateEntityFromDto(PromotionUpdateDTO dto, @MappingTarget Promotion entity);
}
