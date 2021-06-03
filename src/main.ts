import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "@/router"
import store from "@/store"
import { auth } from "@/plugins/firebase"
import VueCompositionAPI, { createApp } from "@vue/composition-api"

import "./styles/quasar.scss"
// import "@quasar/extras/material-icons/material-icons.css"
// import "@quasar/extras/mdi-v5/mdi-v5.css"
// import "@quasar/extras/fontawesome-v5/fontawesome-v5.css"
import Quasar, * as All from "quasar" // eslint-disable-line

import { firestorePlugin } from "vuefire"

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

let app: any
auth.onAuthStateChanged((user: any) => {
	if (!app) {
		app = createApp({
			router,
			store,
			render: (h: any) => h(App),
		})

		app
			.use(Quasar, {
				config: {
					loadingBar: { skipHijack: true },
				},
			})
			.use(firestorePlugin)

		app.mount("#app")
	}

	if (user) {
		store.dispatch("fetchUserProfile", user)
	}
})
