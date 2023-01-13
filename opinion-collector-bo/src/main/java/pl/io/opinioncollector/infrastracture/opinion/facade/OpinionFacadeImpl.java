package pl.io.opinioncollector.infrastracture.opinion.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.client.model.ClientUsername;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;
import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.infrastracture.ClientRepository;
import pl.io.opinioncollector.infrastracture.opinion.repository.OpinionRepository;
import pl.io.opinioncollector.infrastracture.product.repository.ProductRepository;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class OpinionFacadeImpl implements OpinionFacade {

    private final OpinionRepository opinionRepository;
    private final ProductRepository productRepository;
    private final ClientRepository clientRepository;

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
        if (opinion.getCreationDate() == null){
            opinion.setCreationDate(new Date());
        }
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
    public void edit(Opinion opinion, Principal principal) throws IllegalAccessException {
        if ((opinionRepository.findById(opinion.getOpinionId()).isPresent())
            && (Objects.equals(principal.getName(), opinion.getClientUsername()))) {
            log.info("Editing opinion: " + opinion);
            opinionRepository.save(opinion);
        } else {
            throw new IllegalAccessException
                ("No permission to access this opinion");
        }
    }

    @Override
    @Transactional
    public void delete(long opinionId, Principal principal) throws IllegalAccessException {
        Opinion opinion = get(opinionId);
        if ((opinionRepository.existsById(opinionId))
            && (Objects.equals(principal.getName(), opinion.getClientUsername()))) {
            log.info("Deleting opinion with id: " + opinionId);
            opinionRepository.delete(get(opinionId));
        } else {
            throw new IllegalAccessException
                ("No permission to access this opinion");
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
    public void changeHidden(long opinionId, Principal principal) throws IllegalAccessException {
        Opinion opinion = get(opinionId);
        log.info("Opinion is now set to: " + opinion.isHidden()
            + ". Changing visibility to: " + !opinion.isHidden());
        opinion.setHidden(!opinion.isHidden());
        //edit(opinion, principal);
    }

    @Override
    public List<Opinion> getForUser(String username, Principal principal) throws IllegalAccessException {
        if ((clientRepository.findByUsername(new ClientUsername(username)).isPresent())
           && (Objects.equals(principal.getName(), username))) {
            return opinionRepository.findAllByClientUsername(username);
        } else {
            throw new IllegalAccessException
                ("No permission to access this opinion");
        }
    }

    @Override
    public List<Opinion> getVisibleFor(long id) {
        if (productRepository.existsById(id)) {
            log.info("Getting all opinions for product with id: " + id);
            return opinionRepository.findAllByProductIdAndIsHiddenIsFalse(id);
        } else {
            log.warn("Product with id " + id + " dont exist");
            return Collections.emptyList();
        }
    }
}
