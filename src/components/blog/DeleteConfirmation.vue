<template>
	<q-dialog v-model="localShow" persistent>
		<q-card>
			<q-card-section class="row items-center">
				<q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
				<span class="q-ml-sm">Are you sure you want to delete this post?</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					outline
					label="Cancel"
					color="green"
					@click="$emit('hide', !localShow)"
				/>
				<q-btn
					outline
					label="Delete"
					color="red"
					@click="
						$emit('delete', localId)
						$emit('hide', !localShow)
					"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
	import {
		reactive,
		toRefs,
		computed,
		defineComponent,
	} from "@vue/composition-api"

	export default defineComponent({
		props: ["id", "show"],
		setup(props) {
			const element: any = reactive({
				localId: computed(() => props.id),
				localShow: computed(() => props.show),
			})

			return { ...toRefs(element) }
		},
	})
</script>

<style></style>
