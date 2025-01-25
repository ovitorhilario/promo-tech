package com.promotech.api.mappers;

import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.store.dto.StorePreviewDTO;
import com.promotech.api.domain.store.dto.StoreRequestDTO;
import com.promotech.api.domain.store.dto.StoreResponseDTO;
import com.promotech.api.domain.store.dto.StoreUpdateDTO;
import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface StoreMapper {  
    
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),

            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "img_url", target = "imgUrl"),
            @Mapping(source = "link_url", target = "linkUrl"),
            @Mapping(source = "tag", target = "tag"),
    })
    Store toEntity(StoreRequestDTO dto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "imgUrl", target = "img_url"),
            @Mapping(source = "linkUrl", target = "link_url"),
            @Mapping(source = "tag", target = "tag"),
            @Mapping(source = "createdAt", target = "created_at"),
            @Mapping(source = "updatedAt", target = "updated_at"),
    })
    StoreResponseDTO toDto(Store entity);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),

            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "img_url", target = "imgUrl"),
            @Mapping(source = "link_url", target = "linkUrl"),
            @Mapping(source = "tag", target = "tag"),
    })
    void updateEntityFromDto(StoreUpdateDTO dto, @MappingTarget Store entity);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "tag", target = "tag"),
            @Mapping(source = "imgUrl", target = "img_url"),
    })
    StorePreviewDTO toStorePreviewDto(Store entity);
}
