<template>
    <v-container fill-height>
        <v-row class="mx-sm-16 mx-4 my-2 fill-height">
            <v-col cols="12" class="text-center" v-if="pageLoading">
                <v-progress-circular
                    indeterminate
                    class="page-loading"
                    size="100"
                    width="6"
                ></v-progress-circular>
            </v-col>

            <v-col cols="12" v-else>
                <v-row class="align-baseline mx-auto">
                    <v-autocomplete
                        v-model="location"
                        :items="searchResults"
                        outlined
                        label="Type location name here"
                        append-icon="mdi-map-marker"
                        :search-input.sync="query"
                        hide-details
                        item-value="name"
                        item-text="name"
                    >
                        <template #no-data>
                            <div>No data found</div>
                        </template>

                        <template #item="{ item, on, attrs }">
                            <v-list-item two-line v-bind="attrs" v-on="on">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.name }}, {{ item.country }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-autocomplete>
                </v-row>

                <v-row class="justify-space-between flex-column flex-md-row">
                    <v-col cols="12" lg="6">
                        <v-card
                            class="
                                weather-main-data-container
                                d-flex
                                flex-column
                                mt-4
                                mb-8
                            "
                            max-width="650"
                            elevation="3"
                            v-if="weatherData"
                        >
                            <h3 class="font-weight-medium mx-4 mb-2 mt-4">
                                {{ locationData.name }},
                                {{ locationData.country }}
                            </h3>

                            <v-row class="mx-4 my-4 flex-column flex-md-row">
                                <v-col>
                                    <v-row class="align-center mb-4 mb-md-0">
                                        <v-img
                                            :src="
                                                'http://openweathermap.org/img/wn/' +
                                                weatherData.weather[
                                                    weatherData.weather.length -
                                                        1
                                                ].icon +
                                                '.png'
                                            "
                                            max-width="100"
                                        />

                                        <span
                                            class="
                                                font-weight-medium
                                                text-h3
                                                primary--text
                                            "
                                        >
                                            {{
                                                getTemperature(
                                                    weatherData.temp.day
                                                )
                                            }}&#176;C
                                        </span>
                                    </v-row>

                                    <v-row
                                        class="
                                            mt-n6
                                            justify-start justify-md-center
                                            ml-0
                                            accent--text
                                        "
                                    >
                                        Feels like
                                        {{ weatherData.feels_like.day }}&#176;C
                                    </v-row>
                                </v-col>

                                <v-col>
                                    <v-row
                                        class="justify-space-between my-4 mx-0"
                                    >
                                        <span>Condition</span>

                                        <span>{{
                                            weatherData.weather[
                                                weatherData.weather.length - 1
                                            ].main
                                        }}</span>
                                    </v-row>

                                    <v-divider></v-divider>

                                    <v-row
                                        class="justify-space-between my-4 mx-0"
                                    >
                                        <span>Min. temp</span>
                                        <span>
                                            {{
                                                getTemperature(
                                                    weatherData.temp.min
                                                )
                                            }}&#176;C
                                        </span>
                                    </v-row>

                                    <v-divider></v-divider>

                                    <v-row
                                        class="justify-space-between my-4 mx-0"
                                    >
                                        <span>Max. temp</span>

                                        <span>
                                            {{
                                                getTemperature(
                                                    weatherData.temp.max
                                                )
                                            }}&#176;C
                                        </span>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>

                    <v-col cols="12" lg="6">
                        <v-card
                            class="
                                weather-main-data-container
                                d-flex
                                flex-column
                                mt-4
                                mb-8
                            "
                            max-width="650"
                            elevation="3"
                            v-if="weatherData"
                        >
                            <Map
                                :lat="locationData.lat"
                                :lon="locationData.lon"
                            />
                        </v-card>
                    </v-col>
                </v-row>

                <v-switch
                    v-if="weatherData"
                    v-model="showAdditionalInfo"
                    inset
                    label="Show additional info"
                    class="text-right"
                    style="width: fit-content"
                ></v-switch>

                <transition mode="out-in" name="slide-fade">
                    <v-card
                        v-if="showAdditionalInfo && weatherData"
                        class="
                            weather-main-data-container
                            d-flex
                            flex-column
                            mx-auto
                            mt-4
                            mb-8
                        "
                        max-width="650"
                        elevation="3"
                    >
                        <h3 class="font-weight-medium mx-4 mt-4">
                            Additional info
                        </h3>

                        <v-row class="mx-4 flex-column flex-md-row">
                            <v-col>
                                <v-row class="justify-space-between my-4 mx-0">
                                    <span>Wind</span>

                                    <span>{{ weatherData.wind_speed }}</span>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="justify-space-between my-4 mx-0">
                                    <span>Humidity</span>

                                    <span>{{ weatherData.humidity }}</span>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="justify-space-between my-4 mx-0">
                                    <span>Pressure</span>

                                    <span>{{ weatherData.pressure }}</span>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="justify-space-between my-4 mx-0">
                                    <span>Sunrise</span>

                                    <span>{{
                                        getDate(weatherData.sunrise)
                                    }}</span>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="justify-space-between my-4 mx-0">
                                    <span>Sunset</span>

                                    <span>{{
                                        getDate(weatherData.sunset)
                                    }}</span>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </transition>

                <v-card
                    v-if="weatherData"
                    class="
                        d-flex
                        flex-column
                        justify-space-between
                        days-forecast-list
                        list-complete-item
                        my-4
                        px-4
                    "
                >
                    <v-card-title>Future 7 days forecast</v-card-title>

                    <v-card-text
                        class="
                            d-flex
                            justify-space-between
                            flex-column flex-md-row
                        "
                    >
                        <Day
                            v-for="day in futureDaysForecast"
                            :key="day.dt"
                            :date="detDay(day.dt)"
                            :temperature="getTemperature(day.temp.day)"
                            :icon="day.weather[day.weather.length - 1].icon"
                        />
                    </v-card-text>
                </v-card>

                <v-card
                    v-if="weatherData"
                    class="
                        d-flex
                        flex-column
                        justify-space-between
                        days-forecast-list
                        list-complete-item
                        my-4
                        px-4
                    "
                >
                    <v-card-title>Past 5 days Forecast</v-card-title>

                    <v-card-text
                        class="
                            d-flex
                            justify-space-between
                            flex-column flex-md-row
                        "
                    >
                        <Day
                            v-for="day in pastDaysForecast"
                            :key="day.dt"
                            :date="detDay(day.dt)"
                            :temperature="getTemperature(day.temp)"
                            :icon="day.weather[day.weather.length - 1].icon"
                        />
                    </v-card-text>
                </v-card>

                <NotFound v-if="showNotFound" class="mt-8" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from "moment";

import Day from "~/components/common/Day";
import NotFound from "~/components/common/NotFound";
import Map from "~/components/common/Map.vue";

import {
    SearchAddressByQuery,
    GetWeatherByCoordinates,
    GetLocationLatLong,
    GetFutureDaysForecast,
    GetPastDaysData,
} from "../api/DataService";

export default {
    components: {
        Day,
        NotFound,
        Map,
    },
    data() {
        return {
            pageLoading: false,
            location: "",
            showAdditionalInfo: false,
            showNotFound: false,
            locationData: null,
            weatherData: null,
            futureDaysForecast: null,
            pastDaysForecast: [],
            units: "metric",
            currentDate: null,
            query: "",
            searchResults: [],
        };
    },

    async mounted() {
        await this.setCurrentLocationWeather();
    },
    watch: {
        location() {
            this.getLocationLatLong();
        },
        query() {
            this.searchAddressByQuery();
        },
    },
    methods: {
        async searchAddressByQuery() {
            if (!this.query) return;
            try {
                const searchResults = await SearchAddressByQuery(this.query);
                this.searchResults = searchResults.features.map((element) => {
                    return {
                        name: element.properties.name,
                        country: element.properties.country,
                    };
                });
            } catch (error) {
                console.log(error);
            }
        },
        async setCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    if (position.coords.latitude && position.coords.longitude) {
                        this.pageLoading = true;
                        const response = await GetWeatherByCoordinates(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        if (!response) return;
                        this.locationData = response.data[0];
                        this.location = response.data[0].name;
                        this.searchResults.push({
                            name: response.data[0].name,
                            country: response.data[0].country,
                        });
                        this.getFutureDaysForecast(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        this.getPastDaysData(
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        this.pageLoading = false;
                    }
                });
            }
        },

        async getLocationLatLong() {
            this.showNotFound = false;
            try {
                const response = await GetLocationLatLong(this.location);
                this.locationData = response.data[0];
                this.getFutureDaysForecast(
                    this.locationData.lat,
                    this.locationData.lon
                );
                this.getPastDaysData(
                    this.locationData.lat,
                    this.locationData.lon
                );
            } catch (error) {
                this.locationData = null;
                this.weatherData = null;
                this.showNotFound = true;
                this.futureDaysForecast = null;
            }
        },

        async getFutureDaysForecast(lat, lon) {
            try {
                const response = await GetFutureDaysForecast(lat, lon);
                this.weatherData = response.data.daily[0];
                const forecastList = response.data.daily.splice(0, 1);
                this.futureDaysForecast = response.data.daily;
            } catch (error) {
                this.locationData = null;
                this.weatherData = null;
            }
        },

        async getPastDaysData(lat, lon) {
            let promises = [];
            let tempForecast = [];

            for (let i = 0; i < 5; ++i) {
                let day = moment().subtract(i, "d").unix();
                promises.push(GetPastDaysData(lat, lon, day));
            }
            Promise.all(promises)
                .then((results) => {
                    results.map((result) =>
                        tempForecast.push(result.data.current)
                    );
                })
                .catch((e) => {
                    this.locationData = null;
                    this.weatherData = null;
                });
            this.pastDaysForecast = tempForecast;
        },
        getDate(date) {
            return moment.unix(date).format("LT");
        },
        detDay(day) {
            return moment.unix(day).format("DD.MM");
        },
        getTemperature(temp) {
            return parseInt(temp);
        },
    },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}

.weather-main-data-container {
    border: 1px solid green;
    border-radius: 5px;
}
</style>
