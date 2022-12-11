package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;

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

import java.util.List;

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

    @PostMapping
    public Opinion addOpinion(@RequestBody Opinion opinion) {
        return opinionFacade.add(opinion);
    }

    @PutMapping
    public void editOpinion(@RequestBody Opinion opinion) {
        opinionFacade.edit(opinion);
    }

    @DeleteMapping("/{id}")
    public void deleteOpinion(@PathVariable long id) {
        opinionFacade.delete(id);
    }

    @PutMapping("/{id}")
    public void hideOpinion(@PathVariable long id) {
        opinionFacade.changeHidden(id);
    }

}
