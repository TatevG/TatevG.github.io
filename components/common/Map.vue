<template>
    <GmapMap
        ref="mapRef"
        :center="{ lat: lat, lng: lon }"
        :zoom="13"
        map-type-id="roadmap"
        style="width: inherit; height: 280px"
    >
        <GmapMarker
            v-for="m in markers"
            :key="m.id"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            :icon="m.icon"
            @click="center = m.position"
        />
    </GmapMap>
</template>

<script>
export default {
    name: "weather-map",
    data() {
        return {
            markers: [],
        };
    },
    props: {
        lat: {
            type: Number,
            default: 0,
        },
        lon: {
            type: Number,
            default: 0,
        },
    },
};
</script>
