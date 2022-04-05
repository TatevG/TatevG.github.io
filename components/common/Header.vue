<template>
    <v-app-bar app>
        <v-toolbar-title v-text="title" />

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <ThemeChanger />
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import ThemeChanger from "~/components/ThemeChanger.vue";

export default {
    name: "weather-header",
    components: {
        ThemeChanger,
    },
    data() {
        return {
            title: "Weather App",
        };
    },
};
</script>
