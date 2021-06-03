<template>
	<div class="row q-col-gutter-sm">
		<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 column items-center">
			<q-btn
				flat
				color="blue"
				icon="fab fa-twitter"
				@click="openURL('https://twitter.com/SupToasty')"
			/>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 column items-center">
			<q-btn
				flat
				color="blue"
				icon="fab fa-facebook"
				@click="openURL('https://facebook.com/jason.lonsinger')"
			/>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 column items-center">
			<q-btn
				flat
				color="blue"
				icon="fab fa-github"
				@click="openURL('https://github.com/suptoasty')"
			/>
		</div>
		<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 column items-center">
			<q-btn
				flat
				color="blue"
				icon="fab fa-linkedin"
				@click="
					openURL('https://www.linkedin.com/in/jason-lonsinger-46a332149/')
				"
			/>
		</div>
	</div>
</template>

<script>
	import { defineComponent } from "@vue/composition-api"
	import { openURL } from "quasar"

	export default defineComponent({
		setup() {
			return { openURL }
		},
	})
</script>

<style></style>
