const fetchSearchResult = async (query) => {
    let data;
    console.log(query.length);
    try {
      let res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (res.ok) {
        data = await res.json();
        return data;
      } else {
        throw new Error(`api falied with the error ${res.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
    return data;
  };
  export default fetchSearchResult;
  