'use client'
import { useEffect, useState } from "react";
import Initial from "./components/Initial";
import { createApi } from "unsplash-js";
import defaultData from './utils/defaultData.json';
import Results from "./components/Results";
import createTestCollection from "./utils/createTestCollection";

export default function Home() {
  const api = createApi({
    accessKey: "rG-CmtIXnQdOMx_-szUWZbiGZ5d5WBzc2OlJsRfd2eA"
})

// createTestCollection();
useEffect(() => {
  const savedCollections = localStorage.getItem('collections');
  !savedCollections && localStorage.setItem('collections', JSON.stringify([]));
}, []);

const [searchResults, setSearchResults] = useState();

console.log(searchResults);

const loadResults = (params) => {
    api.search
        .getPhotos({ query: params})
        .then(result => {
            setSearchResults(result.response.results)
        })
}
  return (
    <main>
      {!searchResults ? 
        <Initial  loadResults={loadResults} />
        :
        <Results results={searchResults} loadResults={loadResults} />
      }
    </main>
  );
}
