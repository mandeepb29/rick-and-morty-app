export const BASE_CHARACTER_URL = "https://rickandmortyapi.com/api/character";

/**
  * @desc returns JSON data from requested URL
  * @param string $url - the URL from which data is to be fetched
  * @return Response JSON Object
*/
export const getData = async (url) => {
    const data = await fetch(url)
    return data.json();
}

/**
  * @desc returns Episodes Details Array 
  * @param string $episodeURLs - list of episode URLs used to fetched episode details
  * @return Array of Episode Details JSON Objects
*/
export const getEpisodesforCharacter = async (episodeURLs) => {
  let episodes = await Promise.all(episodeURLs.map(async (url) => {
      const episodeResponse = await getData(url);
      return episodeResponse;
  }));
  return episodes;
}


