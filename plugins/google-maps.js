import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyDXdJx6Vs97oLPshO_gioopsyVJtLgs-h4",
		libraries: "places",
		installComponents: true,
	}
});
