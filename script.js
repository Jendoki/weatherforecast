let cityName = "";

function fetchCoordonates() {
    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault();
        document.getElementById("showweather").innerHTML = "";
        cityName = document.getElementById("city").value;

        axios
            .get(
                "https://api.opencagedata.com/geocode/v1/json?q=" +
                `${cityName}` +
                "&key=5d99e353e99f4129a7d94a23a14e97d2&pretty=1"
            )
            .then((response) => {
                let city = response.data.results[0].components.city;
                let country = response.data.results[0].components.country;
                let lat = response.data.results[0].annotations.DMS.lat;
                let lng = response.data.results[0].annotations.DMS.lng;
                let arr1 = lat.split("'");
                lattitude = arr1[0];
                let arr2 = lattitude.split("°");
                let lat1 = arr2[0].trim();
                let lat2 = arr2[1].trim();
                let finallat = lat1 + "." + lat2;

                let arr3 = lng.split("'");
                longitude = arr3[0];
                let arr4 = longitude.split("°");
                let lng1 = arr4[0].trim();
                let lng2 = arr4[1].trim();
                let finallng = lng1 + "." + lng2;
                let citydisplay = "<h4>" + city + ", " + country + "</h4>"

                document.getElementById("citycountry").innerHTML = citydisplay;
                // insertAdjacentHTML
                console.log(citydisplay);
                let selectValue = getSelectValue("howmanydays");
                fetchWeather(finallat, finallng, selectValue);
            });

    });
}

function getSelectValue(selectId) {
    let selectElmt = document.getElementById(selectId);
    return selectElmt.value;
}

function fetchWeather(finallat, finallng, selectValue) {
    axios
        .get(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            `${finallat}` +
            "&lon=" +
            `${finallng}` +
            "&appid=37e601ab82377efff949bfa5bc7126e9"
        )
        .then((response) => {
            let day1weather = response.data.daily[0].weather[0].main;
            let day2weather = response.data.daily[1].weather[0].main;
            let day3weather = response.data.daily[2].weather[0].main;
            let day4weather = response.data.daily[3].weather[0].main;
            let day5weather = response.data.daily[4].weather[0].main;

            let daysarr = [day1weather, day2weather, day3weather, day4weather, day5weather];

            console.log(selectValue);


            for (i = 1; i <= selectValue; i++) {
                showweather(daysarr[i]);
            }
        });
}

function showweather(dayweather) {
    let showweather;

    switch (dayweather) {
        case "Clear":
            showweather =
                '<div class="col"><h4>Day ' + i + '</h4><img class="imgweather" src="assets/weathers/sun.svg" alt=""><p>Clear</p></div>';
            break;
        case "Snow":
            showweather =
                '<div class="col"><h4>Day ' + i + '</h4><img class="imgweather" src="assets/weathers/snow.svg" alt=""><p>Snow</p></div>';
            break;
        case "Clouds":
            showweather =
                '<div class="col"><h4>Day ' + i + '</h4><img class="imgweather" src="assets/weathers/clouds.svg" alt=""><p>Clouds</p></div>';
            break;
        default:
            showweather =
                '<div class="col"><h4>Day ' + i + '</h4><img class="imgweather" src="assets/weathers/rain.svg" alt=""><p>Rain</p></div>';
    }
    document.getElementById("showweather").innerHTML += showweather;
}

fetchCoordonates();