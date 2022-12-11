package pl.io.opinioncollector.domain.product.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "Products")
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

    @Lob
    private String image;

    @Enumerated(EnumType.STRING)
    private ProductOrigin origin;

    private boolean visibility;

    private String ean;

  /*  @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "productId", updatable = false, insertable = false)
    private List<Opinion> opinion;*/
}
