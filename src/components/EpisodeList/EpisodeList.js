import React from 'react';
import styles from "./EpisodeList.module.scss";
import commonStyles from "../../common/commonStyles.module.scss";
import {CgClose} from "react-icons/cg";
import * as emojis from "../../common/emojis";
import PropTypes from 'prop-types';

function EpisodeList(props) {

    EpisodeList.propTypes = {
        toShow: PropTypes.bool,
        characterEpisodeDetails: PropTypes.object,
        closeChapterScreen:PropTypes.func
    };

    return (
        <div className={`popupScreen scrollbarContainer ${props?.toShow ? "show" : ""}`}>
            <div className={styles.container}>
                {/* Customer Details Object */}
                <div className={commonStyles.characterContainer}>
                    <img src={props?.characterEpisodeDetails?.character?.image} alt={props?.characterEpisodeDetails?.character?.name} />

                    <div className='flex-grow-1'>
                        <h5>
                            {props?.characterEpisodeDetails?.character?.name}
                        </h5>
                        <h6 className='font-weight-normal text-secondary'>
                        <span className={`${commonStyles.status} ${commonStyles[props?.characterEpisodeDetails?.character?.status]}`}></span>

                     {props?.characterEpisodeDetails?.character?.status}, 
                     
                     {emojis.speciesEmojis[props?.characterEpisodeDetails?.character?.species]}  
                     {props?.characterEpisodeDetails?.character?.species}, 
                     
                     {emojis.genderEmojis[props?.characterEpisodeDetails?.character?.gender]} 
                     {props?.characterEpisodeDetails?.character?.gender}
                        </h6>
                    </div>

                    <CgClose onClick={() => props.closeChapterScreen(null,null, false)} size={30} className="flex-grow-auto cursor-pointer" />
                </div>
                {/* Customer Episode List */}
                <div className={styles.containerEpisodes}>
                    <h5 className="text-primary text-uppercase mb-5">
                        Episode list
                    </h5>
                    {props?.characterEpisodeDetails?.episodes.map((episode,index) => (
                        <div key={`chapter-item-${index}`} className={styles.containerEpisodeItem}>
                            <h6>
                                {episode.name}
                            </h6>
                            <p className='text-secondary font-weight-bold'>
                                Released on : {episode.air_date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EpisodeList;