const queryValue = (query: string, url: string) => {
   const urlSearchParams = new URLSearchParams(url);
   const searchValue = urlSearchParams.get(query);

   return searchValue;
};

export default queryValue;
