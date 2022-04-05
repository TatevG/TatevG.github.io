<template>
    <v-card class="my-4 d-flex flex-column align-center" elevation="1">
        <h3 class="font-weight-medium mx-4 my-4">{{ date }}</h3>

        <span class="font-weight-medium text-h4 primary--text"
            >{{ temperature }}&#176;C</span
        >

        <v-img
            :src="'http://openweathermap.org/img/wn/' + icon + '.png'"
            width="100"
        />
    </v-card>
</template>

<script>
export default {
    name: "weather-day",
    data() {
        return {};
    },
    props: {
        date: {
            type: String,
            default: "",
        },
        temperature: {
            type: Number,
        },
        icon: {
            type: String,
            default: "",
        },
    },
};
</script>
