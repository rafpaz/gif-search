const gifsAPI = {
    endPoint: "https://api.tenor.com/v1/%TYPE%?key=WQLV7FQBFVAB&media_filter=minimal&%VALUE%",
    apiFetch: function(type, value){
        let url = this.endPoint.replace("%TYPE%", type).replace("%VALUE%", value);
        return fetch(url).then(result => result.json());
    },
    search: function(query){
        return this.apiFetch("search", "q=" + query);
    },
    gif: function(id){
        return this.apiFetch("gifs", "ids=" + id);
    }
};

export default gifsAPI;
