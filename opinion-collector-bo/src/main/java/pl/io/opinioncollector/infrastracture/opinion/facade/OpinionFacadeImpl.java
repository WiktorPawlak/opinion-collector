package pl.io.opinioncollector.infrastracture.opinion.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;
import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.infrastracture.opinion.repository.OpinionRepository;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class OpinionFacadeImpl implements OpinionFacade {

    private final OpinionRepository opinionRepository;
    private final ProductRepository productRepository;

    @Override
    public List<Opinion> getFor(long productId) {
        if (productRepository.existsById(productId)) {
            log.info("Getting all opinions for product with id: " + productId);
            return opinionRepository.findAllByProductId(productId);
        } else {
            log.warn("Product with id " + productId + " dont exist");
            return Collections.emptyList();
        }
    }

    @Override
    public List<Opinion> findAll() {
        log.info("Getting all opinions");
        return opinionRepository.findAll();
    }

    @Override
    public Opinion get(long opinionId) {
        log.info("Getting opinion with id: " + opinionId);
        return opinionRepository.findById(opinionId).orElse(null);
    }

    @Override
    @Transactional
    public Opinion add(Opinion opinion) {
        if (productRepository.existsById(opinion.getProductId())) {
            log.info("Adding opinion: " + opinion);
            return opinionRepository.save(opinion);
        } else {
            log.warn("Product with id " + opinion.getProductId() + " dont exist");
            return null;
        }
    }

    @Override
    @Transactional
    public void edit(Opinion opinion) {
        if (opinionRepository.findById(opinion.getOpinionId()).isPresent()) {
            log.info("Editing opinion: " + opinion);
            opinionRepository.save(opinion);
        }
    }

    @Override
    @Transactional
    public void delete(long opinionId) {
        if (opinionRepository.existsById(opinionId)) {
            log.info("Deleting opinion with id: " + opinionId);
            opinionRepository.delete(get(opinionId));
        } else {
            log.warn("Opinion with id: " + opinionId + " dont exist");
        }
    }

    @Override
    public double starAverage(long productId) {
        log.info("Calculating average star points for product with id: " + productId);
        return getFor(productId).stream()
            .mapToDouble(opinion -> Integer.parseInt(opinion.getStarReview().getStar()))
            .average()
            .orElse(Double.NaN);
    }

    @Override
    @Transactional
    public void changeHidden(long opinionId) {
        Opinion opinion = get(opinionId);
        log.info("Opinion is now set to: " + opinion.isHidden() + ". Changing visibility to: " + !opinion.isHidden());
        opinion.setHidden(!opinion.isHidden());
        edit(opinion);
    }
}
