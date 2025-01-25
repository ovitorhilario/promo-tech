package com.promotech.api.controllers;

import com.promotech.api.domain.category.dto.CategoryRequestDTO;
import com.promotech.api.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/list-all")
    public ResponseEntity<Object> listAll() {
        return ResponseEntity.ok(categoryService.listAll());
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> create(@RequestBody @Valid CategoryRequestDTO dto) {
        return ResponseEntity.ok(categoryService.create(dto));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> delete(@PathVariable(name = "id") UUID id) {
        categoryService.delete(id);
        return ResponseEntity.ok().build();
    }
}
