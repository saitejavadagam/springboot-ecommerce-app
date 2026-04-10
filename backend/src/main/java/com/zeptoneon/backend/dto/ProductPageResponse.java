package com.zeptoneon.backend.dto;

import java.util.List;

public record ProductPageResponse(
        List<ProductResponse> products,
        int currentPage,
        int totalPages,
        long totalElements
) {
}
