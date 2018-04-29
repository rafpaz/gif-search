const gifsAPI = {
    endPoint: "https://api.tenor.com/v1/%TYPE%?key=WQLV7FQBFVAB&media_filter=minimal&limit=%LIMIT%&pos=%POS%&%VALUE%",
    limit: 20,
    pos: 0,
    setLimit: function(num){
        this.limit = num;
    },
    setPosition: function(newPos){
        this.pos = newPos;
    },
    apiFetch: function(type, value){
        let url = this.endPoint.replace("%TYPE%", type)
                                .replace("%VALUE%", value)
                                .replace("%LIMIT%", this.limit)
                                .replace("%POS%", this.pos)
                                ;
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
