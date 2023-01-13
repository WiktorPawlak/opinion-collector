import React from 'react';
import css from './OpinionTile.module.scss';
import {Link} from 'react-router-dom';
import {useClient} from "../../../hooks/useUser";
import {putOpinionHidden} from "../../../api/opinionApi";


const Opinion = ({ clientUsername, opinionContent, opinionPros,
                 opinionCons, creationDate, opinionId, starReview, hidden, handleOpinionHide}) => {
    const { clientRole } = useClient();
    return (
        <div className={css.opinion}>
            <h2>{clientUsername}</h2>
            <div className={css.parentDiv}>
                <div className={css.childDiv}>
                    <p>Id: {opinionId}</p>
                    <p>Creation Date: {new Date(creationDate).toLocaleString()}</p>
                    <p>Stars: {starReview}/FIVE</p>
                    <p>{decodeURIComponent(opinionContent)}</p>
                    <p>Pros: {decodeURIComponent(opinionPros)}</p>
                    <p>Cons: {decodeURIComponent(opinionCons)}</p>
                    {clientRole === 'ADMIN'
                    && <p>Hidden: {hidden.toString()}</p>}
                    {clientRole === 'ADMIN'
                    && <button className={css.HideBtn} onClick={handleOpinionHide}>Hide Opinion</button>}
                    {clientRole === 'STANDARD'
                    && <button className={css.DeleteBtn}>Delete Opinion</button>}
                    {clientRole === 'ADMIN'
                    &&
                    <Link style={{ marginRight: '10vw' }} to={`/opinions/edit/${opinionId}`}>
                        <button className={css.EditBtn}>Edit Opinion</button>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default Opinion;
