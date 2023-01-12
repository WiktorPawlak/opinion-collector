import React from 'react';
import css from './OpinionTile.module.scss';
import { Link } from 'react-router-dom';

const Opinion = ({ clientUsername, opinionContent, opinionPros,
                 opinionCons, creationDate, opinionId, starReview}) => {
    return (
        <div className={css.opinion}>
            <h2>{clientUsername}</h2>
            <div className={css.parentDiv}>
                <div className={css.childDiv}>
                    <p>Creation Date: {creationDate}</p>
                    <p>{starReview}</p>
                    <p>{opinionContent}</p>
                    <p>Cons: {opinionCons}</p>
                    <p>Pros: {opinionPros}</p>
                </div>
            </div>
        </div>
    );
};

export default Opinion;
