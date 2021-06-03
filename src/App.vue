<template>
	<div id="app">
		<q-layout>
			<q-page-container>
				<Navbar />
				<router-view />
			</q-page-container>
		</q-layout>
	</div>
</template>

<script lang="ts">
	import Navbar from "@/components/Navigation/Navbar.vue"
	import { defineComponent } from "@vue/composition-api"

	export default defineComponent({
		components: {
			Navbar,
		},
	})
</script>

<style></style>
