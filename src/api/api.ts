// Поиск адреса по названию от сервиса DaData
export function getCities(query: string, callback: Function) {
    const apiKey: string = "455f715afa3cecb9bd714bbf8a6991db6ad9fffb";
    const url: string = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

    const options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + apiKey
        },
        body: JSON.stringify({
            "query": query,
            "count": 5,
            "from_bound": { "value": "city" },
            "to_bound": { "value": "city" },
            "locations": [
                {
                    "country": "*"
                }
            ]
        })
    }

    fetch(url, options)
    .then(response => response.json())
    .then(result => callback(result));
}

// Геокодер от Яндекс
export function GetGeo(cityName: string, callback: Function) {
    const apiKey: string = "af9104b8-bd24-4074-9c23-21627ce5b99f";
    const url: string = "https://geocode-maps.yandex.ru/1.x/?apikey=" + apiKey + "&geocode=" + cityName + "&format=json";
    fetch(url)
        .then(response => response.json())
        .then(result => callback(result));
}