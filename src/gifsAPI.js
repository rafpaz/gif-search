const gifsAPI = {
    endPoint: "https://api.tenor.com/v1/%TYPE%?key=WQLV7FQBFVAB&media_filter=minimal&limit=%LIMIT%&%VALUE%",
    limit: 20,
    setLimit: function(num){
        this.limit = num;
    },
    apiFetch: function(type, value){
        let url = this.endPoint.replace("%TYPE%", type).replace("%VALUE%", value).replace("%LIMIT%", this.limit);
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
