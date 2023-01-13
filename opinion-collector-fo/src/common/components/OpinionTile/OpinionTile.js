import React from 'react';
import css from './OpinionTile.module.scss';
import { Link } from 'react-router-dom';
import { useClient} from "../../../hooks/useUser";


const Opinion = ({ clientUsername, opinionContent, opinionPros,
                 opinionCons, creationDate, opinionId, starReview}) => {
    const { clientRole } = useClient();
    return (
        <div className={css.opinion}>
            <h2>{clientUsername}</h2>
            <div className={css.parentDiv}>
                <div className={css.childDiv}>
                    <p>Creation Date: {creationDate}</p>
                    <p>Stars: {starReview}/FIVE</p>
                    <p>{opinionContent}</p>
                    <p>Pros: {decodeURIComponent(opinionPros)}</p>
                    <p>Cons: {opinionCons}</p>
                    {clientRole === 'ADMIN'
                    && <button className={css.HideBtn}>Hide Opinion</button>}
                    {clientRole === 'ADMIN'
                    && <button className={css.DeleteBtn}>Delete Opinion</button>}
                    {clientRole === 'ADMIN'
                    && <button className={css.EditBtn}>Edit Opinion</button>}
                </div>
            </div>
        </div>
    );
};

export default Opinion;
