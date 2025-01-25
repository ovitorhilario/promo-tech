package com.promotech.api.controllers;

import com.promotech.api.domain.store.dto.StoreRequestDTO;
import com.promotech.api.domain.store.dto.StoreUpdateDTO;
import com.promotech.api.services.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("store")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/list-all")
    ResponseEntity<Object> listAll() {
        return ResponseEntity.ok(storeService.listAll());
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Object> create(@RequestBody @Valid StoreRequestDTO dto) {
        return ResponseEntity.ok(storeService.create(dto));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Object> update(@RequestBody @Valid StoreUpdateDTO dto, @PathVariable(name = "id") UUID id) throws IllegalAccessException {
        return ResponseEntity.ok(storeService.update(dto, id));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Object> delete(@PathVariable(name = "id") UUID id) {
        storeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleArgumentException(final IllegalAccessException ex) {
        return new ResponseEntity("Illegal Argument: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
