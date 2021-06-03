<template>
	<q-page padding>
		<ContactFormViewer />
	</q-page>
</template>

<script>
	import ContactFormViewer from "@/components/Forms/ContactFormViewer"
	import { defineComponent } from "@vue/composition-api"

	export default defineComponent({
		components: {
			ContactFormViewer,
		},
		setup() {},
	})
</script>

<style lang="scss" scoped></style>
