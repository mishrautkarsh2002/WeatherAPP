let weather = {
    apiKey: "5ea7c4ff4e0d18bd571069d6be593457",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => console.log(error));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        let { temp, humidity } = data.main;
        const { speed } = data.wind;
        temp = temp - 273.15;
        temp = temp.toFixed(2);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = speed + "kmph";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    Search: function() {
        this.fetchWeather(document.querySelector('.search').value);
    },
};
document.querySelector('.searchButton').addEventListener('click', function() {
    weather.Search();
});

document.querySelector('.search').addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        weather.Search();
    }
});