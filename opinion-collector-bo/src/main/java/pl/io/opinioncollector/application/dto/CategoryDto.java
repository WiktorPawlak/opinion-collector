package pl.io.opinioncollector.application.dto;

import lombok.Data;

@Data
public class CategoryDto {
    private long categoryId;
    private long parentId;
    private String categoryName;
}
