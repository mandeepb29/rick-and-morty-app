import React, { useEffect, useState } from 'react';
import Character from '../Character/Character';
import styles from "./CharactersGrid.module.scss";
import EpisodeList from "../EpisodeList/EpisodeList";
import LocationDetails from "../LocationDetails/LocationDetails";
import * as fetchService from "../../services/fetchDataService";
import PropTypes, { object } from 'prop-types';

export default function CharactersGrid(props) {

  CharactersGrid.propTypes = {
    startOffset: PropTypes.number,
    totalCharacters: PropTypes.number,
    characters:PropTypes.arrayOf(object) 
};

 const [endOffset, setEndOffset] = useState(0); //index of last character on currentpage
 const recordsPerPage = 20;

 const [characterEpisodeDetails,setCharacterEpisodeDetails] = useState(null); //state obj for ChaptersList component
 const [locationDetails,setLocationDetails] = useState(null);//state obj for LocationDetails component
 const [showChapters,setShowChapters] = useState(false); //to toggleView of ChaptersList component
 const [showLocation,setShowLocation] = useState(false); //to toggleView of LocationDetails component

 useEffect(() => {
  setEndOffset(props.startOffset+recordsPerPage)
 },[props.startOffset])

/**
  * @desc update state and toggle the view of ChaptersList Component on the page 
  * @param object $character - character to show chapters for, episodes list, viewValue (showHide)
  * @return toggle the ChaptersList component
*/
const toggleChapterScreen = (character,episodes,toShow = true) => {
  if(toShow){
    const chaptersObj = {
      character:character,
      episodes:episodes
    }
    setCharacterEpisodeDetails(chaptersObj);
    setShowChapters(true)
  }
  else{
    setShowChapters(false)
  }
}

/**
  * @desc update state (by getting data from API) and toggle the view of LocationDetails Component on the page 
  * @param object $character - character to show location details for, location object, viewValue (show/Hide)
  * @return toggle the ChaptersList component
*/
const toggleLocationScreen = async (character, location,locationType,toShow = true) => {
  if(toShow){
    setShowLocation(true);
    const locationJson = await fetchService.getData(location.url);
    const locationdetails = {
      character:character,
      location:locationJson,
      type:locationType
    }
    setLocationDetails(locationdetails);
  }
  else{
    setShowLocation(false)
  }
}

  return (
    <>
      <div className={`container ${styles.container}`}>
        <h6 className='text-capitalise text-secondary'>
          Showing <span className="text-white">{props.startOffset + 1}</span>  to <span className="text-white">{endOffset > props.totalCharacters ? props.totalCharacters : endOffset}</span> out of <span className="text-primary">{props.totalCharacters}</span>  characters
        </h6> 

      <div className="row">
        {props.characters.map((character,index) =>
            <div className='col-lg-4 col-md-6 d-flex' key={`character-card-${index}`}>
              <Character character={character} openChapterScreen={toggleChapterScreen} openLocationScreen={toggleLocationScreen} />
            </div>
        )}
      </div> 
    </div>

    <EpisodeList characterEpisodeDetails = {characterEpisodeDetails} toShow={showChapters} closeChapterScreen={toggleChapterScreen}/>
    <LocationDetails locationDetails = {locationDetails} toShow={showLocation} closeLocationScreen={toggleLocationScreen}/>

    {/* Overlay over webpage when a above screen is opened */}
    <div id="bodyOverlay" className={showChapters || showLocation ? "show":""} ></div>
    </>

)

}

