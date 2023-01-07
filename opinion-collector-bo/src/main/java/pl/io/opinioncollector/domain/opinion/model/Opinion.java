package pl.io.opinioncollector.domain.opinion.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Opinion")
public class Opinion {
    @Enumerated(EnumType.STRING)
    @NonNull
    private StarReview starReview;

    private String opinionContent;

    private String opinionPros;

    private String opinionCons;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "opinionId", nullable = false)
    private long opinionId;

    private String clientUsername;

    private long productId;

    private boolean isHidden;

    private Date creationDate;

    private Date modificationDate;
}

