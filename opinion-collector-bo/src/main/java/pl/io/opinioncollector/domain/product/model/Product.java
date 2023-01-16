package pl.io.opinioncollector.domain.product.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Products")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId", nullable = false)
    private long id;

    private long categoryId;

    @NotEmpty
    private String title;

    private String image;

    @Enumerated(EnumType.STRING)
    private ProductOrigin origin;

    private boolean visibility = true;

    @Column(name="ean", unique=true)
    private String ean;

  /*  @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "productId", updatable = false, insertable = false)
    private List<Opinion> opinion;*/
}
