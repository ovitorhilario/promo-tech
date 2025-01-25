package com.promotech.api.services;

import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.store.dto.StoreRequestDTO;
import com.promotech.api.domain.store.dto.StoreResponseDTO;
import com.promotech.api.domain.store.dto.StoreUpdateDTO;
import com.promotech.api.mappers.StoreMapper;
import com.promotech.api.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreMapper mapper;

    public Optional<StoreResponseDTO> create(StoreRequestDTO dto) {
        Store store = mapper.toEntity(dto);
        return Optional.ofNullable(mapper.toDto(storeRepository.save(store)));
    }

    public void delete(UUID storeId) {
        storeRepository.deleteById(storeId);
    }

    public Optional<StoreResponseDTO> update(StoreUpdateDTO dto, UUID storeId) throws IllegalAccessException {
        Store store = storeRepository.findById(storeId).orElseThrow(() ->
                new IllegalArgumentException("Invalid store to update")
        );
        mapper.updateEntityFromDto(dto, store);
        return Optional.ofNullable(mapper.toDto(storeRepository.save(store)));
    }

    public List<StoreResponseDTO> listAll() {
        return storeRepository.findAll(sortByCreation())
                .stream().map(mapper::toDto).toList();
    }

    public Optional<Store> getById(UUID id) {
        return storeRepository.findById(id);
    }

    private Sort sortByCreation() {
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }
}
