<template>
	<q-page padding>
		<q-card class="fixed-center">
			<q-img :src="require('@/assets/images/scared-batman.jpg')" />
			<q-card-section>
				<h3 class="text-white">404 Batman is Scared!</h3>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script lang="ts">
	import { defineComponent } from "@vue/composition-api"
	export default defineComponent({})
</script>

<style lang="scss" scoped>
	@import "@/styles/colors.scss";
	.q-card {
		background: $background-accent;
		border-radius: 25px;
		max-width: 65%;
		max-height: 65%;
	}
</style>
