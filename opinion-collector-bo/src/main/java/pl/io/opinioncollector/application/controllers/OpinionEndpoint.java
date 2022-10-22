package pl.io.opinioncollector.application.controllers;

import pl.io.opinioncollector.application.dto.OpinionDto;
import pl.io.opinioncollector.domain.opinion.OpinionFacade;

public class OpinionEndpoint {
    private OpinionFacade opinionFacade;

    public ResponseEntity addOpinion(OpinionDto opinionDto) {
        opinionFacade.add(opinionDto.toDomain());

        return ResponseEntity.ok();
    }
}
