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

		<div
			class="row q-col-gutter-md items-stretch"
			style="background-color: red;"
		>
			<!-- new row -->
			<div class="column" style="background-color: green;">
				Site Stack: Vue, Firebase, Quasar
			</div>
		</div>
	</q-page>
</template>

<script lange="ts">
	import ContactForm from "@/components/Forms/ContactForm"
	import { defineComponent } from "@vue/composition-api"

	export default defineComponent({
		components: {
			ContactForm,
		},
	})
</script>

<style lang="scss" scoped></style>
