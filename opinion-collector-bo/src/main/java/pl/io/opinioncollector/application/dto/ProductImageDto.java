package pl.io.opinioncollector.application.dto;


import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

@Getter
@Builder
@AllArgsConstructor
public class ProductImageDto {

    private long id;

    private long categoryId;

    private String title;

    private MultipartFile image;

    private ProductOrigin origin;

    private String ean;
}
