package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;
import pl.io.opinioncollector.domain.opinion.model.Opinion;
import pl.io.opinioncollector.domain.opinion.model.StarReview;
import pl.io.opinioncollector.domain.product.model.ProductOrigin;

import java.util.Arrays;
import java.util.List;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/opinions")
public class OpinionController {
    private final OpinionFacade opinionFacade;

    @GetMapping
    public List<Opinion> getAllOpinions() {
        return opinionFacade.findAll();
    }

    @GetMapping("/{id}")
    public Opinion getOpinion(@PathVariable long id) {
        return opinionFacade.get(id);
    }

    @GetMapping("client/{username}")
    public ResponseEntity<Object> getAllUserOpinions(@PathVariable String username, Principal principal) {
        try {
            return ResponseEntity.ok(opinionFacade.getForUser(username, principal));
        } catch(IllegalAccessException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    //@PreAuthorize("hasAuthority('STANDARD')")
    @PostMapping
    public Opinion addOpinion(@RequestBody Opinion opinion) {
        return opinionFacade.add(opinion);
    }

    @PreAuthorize("hasAuthority('STANDARD')")
    @PutMapping
    public ResponseEntity<Object> editOpinion(@RequestBody Opinion opinion, Principal principal) {
        try {
            opinionFacade.edit(opinion, principal);
            return ResponseEntity.ok("Opinion edited successfully");
        } catch(IllegalAccessException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('STANDARD')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOpinion(@PathVariable long id, Principal principal){
        try{
            opinionFacade.delete(id, principal);
            return ResponseEntity.ok("Opinion deleted successfully");
        } catch(IllegalAccessException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public void hideOpinion(@PathVariable long id, Principal principal) throws IllegalAccessException {
        opinionFacade.changeHidden(id, principal);
    }

    @GetMapping("/starReviews")
    public List<StarReview> getOpinionStarReviews() {
        return Arrays.stream(StarReview.ONE.getDeclaringClass().getEnumConstants()).toList();
    }
}
