import React, { useEffect, useState } from 'react'
import styles from "./Character.module.scss";
import commonStyles from "../../common/commonStyles.module.scss";
import * as emojis from "../../common/emojis";
import * as fetchService from '../../services/fetchDataService';
import PropTypes from 'prop-types';

export const Character = (props) => {
  Character.propTypes = {
    character: PropTypes.object,
    openLocationScreen: PropTypes.func,
    openChapterScreen: PropTypes.func
};

  const [episodesList, setEpisodesList] = useState([]);
  const [charaterInfo, setCharaterInfo] = useState(props.character); //state for character on card

  useEffect(() => {
    setCharaterInfo(props.character);
    const fetchCharaterEpisodes = async () => {
      return await fetchService.getEpisodesforCharacter(props.character.episode)
    }
    //get the episode details for each episode character is appeared in
    fetchCharaterEpisodes().then((episodesArray) =>
    setEpisodesList(episodesArray)).catch(err => {
      console.log(err);
      window.alert("Unable to fetch episodes names. Error: ", err);
    });
  }, [props.character]);

  return (
    <div className={styles.card}>
      {/* Card Top Section */}
      <div>
        <div className={styles.img}>
          <img src={charaterInfo.image} alt={charaterInfo.name} />
        </div>

        <h4 className='text-capitalize text-center text-primary mb-4'>
          {charaterInfo.name}
        </h4>
      </div>
      
      <div className={styles.content}>
        {/* Card Character Details Row */}
        <div className='text-center d-flex align-items-center justify-content-between gap-2 mb-0'>
          <h6 className={commonStyles.valueTextBig}>
            <span className={`${commonStyles.status} ${commonStyles[charaterInfo.status]}`}></span>
            {charaterInfo.status}
          </h6>

          <h6 className={commonStyles.valueTextBig}>
            {emojis.speciesEmojis[charaterInfo.species]}  {charaterInfo.species}
          </h6>

          <h6 className={commonStyles.valueTextBig}>
          {emojis.genderEmojis[charaterInfo.gender]} {charaterInfo.gender}
          </h6>
        </div>

        {/* Card Character Locations Row */}
        <div className="row mt-4">
          <div className="col-6">
            <span className={commonStyles.labelText}>Origin</span>
            <p className={commonStyles.valueText}>
              {
                charaterInfo.origin.url ?
                  <a className="text-success" onClick={() => props.openLocationScreen(charaterInfo, charaterInfo.origin, "location of origin")}>
                    {charaterInfo.origin.name}
                  </a> :
                  <span>
                    {charaterInfo.origin.name}
                  </span>
              }
            </p>
          </div>
          <div className="col-6">
            <span className={commonStyles.labelText}>Current location</span>
            <p className={commonStyles.valueText}>
              {
                charaterInfo.location.url ?
                  <a className="text-success" onClick={() => props.openLocationScreen(charaterInfo, charaterInfo.location, "current location")}>
                    {charaterInfo.location.name}
                  </a> :
                  <span>
                    {charaterInfo.location.name}
                  </span>
              }
            </p>
          </div>
        </div>

      {/* Card Character Episodes Section */}
        <p className='break-all'>
          <span className={commonStyles.labelText}>Seen in episode(s) </span>
          {episodesList.length > 1 ?
            <span className={commonStyles.valueText}>
              <span>
                {episodesList[0]?.name + ' '}
              </span> {' & '}
              <a className="text-success text-lowercase mr-2" onClick={() => props.openChapterScreen(charaterInfo, episodesList)}>{episodesList.length - 1} other(s)</a>
            </span> :
            <span className={commonStyles.valueText} >
              <span>{episodesList[0]?.name}</span>
            </span>
          }
        </p>

      </div>
    </div>
  )
}

export default Character;