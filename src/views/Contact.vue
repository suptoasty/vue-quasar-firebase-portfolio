<template>
	<q-page padding>
		<!-- <a href="https://ko-fi.com/S6S21RZGA" target="_blank"
			><img
				height="36"
				style="border:0px;height:36px;"
				src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
				border="0"
				alt="Buy Me a Coffee at ko-fi.com"
		/></a> -->

		<div class="row justify-center">
			<!-- new row -->
			<div class="col-lg-6 col-md-8 col-sm-12 col-xs-12 column">
				<q-card class="q-pa-md">
					<ContactForm class="text-white" :dark="true" color="green" />
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script lange="ts">
import ContactForm from "@/components/Forms/ContactForm";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
	components: {
		ContactForm,
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.q-card {
	background: $background-accent;
}
</style>