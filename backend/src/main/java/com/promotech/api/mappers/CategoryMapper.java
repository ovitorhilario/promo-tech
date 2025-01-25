package com.promotech.api.mappers;

import com.promotech.api.domain.category.Category;
import com.promotech.api.domain.category.dto.CategoryPreviewDTO;
import com.promotech.api.domain.category.dto.CategoryRequestDTO;
import com.promotech.api.domain.category.dto.CategoryResponseDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface CategoryMapper {

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "tag", target = "tag")
    })
    Category toEntity(CategoryRequestDTO dto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "tag", target = "tag")
    })
    CategoryResponseDTO toDto(Category entity);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "tag", target = "tag")
    })
    CategoryPreviewDTO toCategoryPreviewDto(Category entity);
}
