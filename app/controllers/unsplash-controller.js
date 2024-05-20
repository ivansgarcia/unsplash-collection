import { createApi } from "unsplash-js";

const api = createApi({
    accessKey: "rG-CmtIXnQdOMx_-szUWZbiGZ5d5WBzc2OlJsRfd2eA"
})

const loadResults = () => {
    api.search
        .getPhotos({ query: "cat", orientation: "landscape"})
        .then(result => {
            console.log(result.response.results);
        })
}

export default loadResults;