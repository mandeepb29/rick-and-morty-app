import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import Header from "./components/Header/Header";
import CharactersGrid from './components/CharactersGrid/CharactersGrid';
import Pagination from './components/Pagination/Pagination';
import * as fetchService from "./services/fetchDataService";

const App = () => {
  const [characters, setCharacters] = useState([]); //List of Characters to be shown on the Current Page
  const [resposneInfo, setresposneInfo] = useState({}); //Info object returned with characters request (will be used for total count and pagination)
  const [startOffset, setStartOffset] = useState(null); //Index of first character shown in the current page
  const [pageNumber, setPageNumber] = useState(0);// current page number
  const [characterLoading, setCharacterLoading] = useState(true);//toggle Loader while fetchind data
  const [searchString, setSearchString] = useState("");
  const recordsPerPage = 20;

  useEffect(() => {
    //get the characters for first Page
    const fetchCharactersData = async() => {
      return await fetchService.getData(`${fetchService.BASE_CHARACTER_URL}`);
    }

    fetchCharactersData().then((characterArrayJson) => {
      console.log("characterArrayJson - ",characterArrayJson)
      setCharacters(characterArrayJson.results);
      setresposneInfo(characterArrayJson.info);
      setCharacterLoading(false);
    }).catch(err => {
      window.alert("Unable to fetch characters. Please try again.");
      console.log("Error in character search result fetch" - err);
    })
    setStartOffset(0) //set the index of first character as 0 for page 0
  }, []);


const handleCharacterSearch = async(searchString) => {
  console.log("calling handleCharacterSearch - ",searchString);
  const searchUrl = `?name=${searchString}`;
  setCharacterLoading(true);
  setPageNumber(0);
  setStartOffset(0);
  setSearchString(searchString);
  await fetchService.getData(`${fetchService.BASE_CHARACTER_URL}/${searchUrl}`).
  then((characterSearchResponse) => {
    console.log("characterSearchResponse" , characterSearchResponse);
    if(characterSearchResponse?.results != null){
      setCharacters(characterSearchResponse.results);
      setresposneInfo(characterSearchResponse.info);
    }
    else{
      setCharacters([]);
      setresposneInfo(null);
    }
    setCharacterLoading(false);
  }).catch(err => {
    window.alert("Unable to fetch search results. Please try again.");
    console.log("Error in character search result fetch" - err);
  });
}

  /**
  * @desc get the character lsit for current page and update pagination variables according to input
  * @param number $page - current page number
  * @return update states with new characters values
*/
  const handlePageClick = async (page) => {
    if (page - 1 != pageNumber) {
      setCharacterLoading(true);
      setPageNumber(page - 1);
      setStartOffset((page - 1) * recordsPerPage);

      try {
        let searchQueryString;
        if(searchString)
        {
          searchQueryString = `&name=${searchString}`;
        }
        else{
          searchQueryString = "";
        }
        const charactersResponse = await fetchService.getData(`${fetchService.BASE_CHARACTER_URL}/?page=${page}${searchQueryString}`);
        console.log("handlePageClick charactersResponse", charactersResponse);
        setCharacters(charactersResponse.results);
        setresposneInfo(charactersResponse.info);
        window.scrollTo(0, 0);
        setCharacterLoading(false);
      }
      catch (err) {
        window.alert("Unable to fetch characters. Please try again");
        console.log("Error in character fetch" - err);
      }
    }
  };

  return (
    <div>
      <Pagination totalPages={resposneInfo?.pages} activePageNumber={pageNumber} handlePageSelect={handlePageClick} />
      <div className="body-container">
        <Header handleCharacterSearch={handleCharacterSearch} />
        {
          characterLoading ? 
          <div className="loadingSpinner"></div>:
          <CharactersGrid characters={characters} totalCharacters={resposneInfo?.count} startOffset={startOffset} />
        }
        
      </div>
    </div>
  );
}

export default App;
