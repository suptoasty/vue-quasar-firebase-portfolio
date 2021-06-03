<template>
	<q-card class="q-pa-md q-ma-md" id="message-box">
		<q-list>
			<q-toggle
				color="green"
				:label="filterMessage"
				v-model="hideRead"
				toggle-indeterminate
				keep-color
			/>
			<q-expansion-item
				popup
				v-for="form in filter"
				:key="form.id"
				:icon="setIcon(form.viewed)"
				:label="form.name"
				:caption="form.email + ' | ' + form.createdOn.toDate().toLocaleString()"
				header-style="background: #fff;"
			>
				<q-separator />
				<q-card>
					<q-card-section class="text-black">
						{{ form.message }}
					</q-card-section>
					<q-card-actions align="right">
						<q-btn
							outline
							:color="!form.viewed ? 'green' : 'blue'"
							:label="!form.viewed ? 'Mark As Read' : 'Unmark Read'"
							@click="toggleViewed(form)"
						/>
					</q-card-actions>
				</q-card>
			</q-expansion-item>
		</q-list>
	</q-card>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		onMounted,
		reactive,
		toRefs,
	} from "@vue/composition-api"
	import { contactFormsCollection } from "@/plugins/firebase"

	export default defineComponent({
		setup() {
			const element: any = reactive({
				forms: [],
				hideRead: null,
				filter: computed(() => {
					let data = element.forms

					if (element.hideRead == null) return data
					else if (element.hideRead)
						return data.filter((form: any) => !form.viewed)
					else return data.filter((form: any) => form.viewed)
				}),
				filterMessage: computed(() => {
					if (element.hideRead == null) return "All Messages"
					else if (element.hideRead) return "All Unread"
					else return "All Read"
				}),
			})

			onMounted(() => {})

			function setIcon(viewed: any) {
				if (viewed) return "drafts"
				return "mail"
			}

			function toggleViewed(form: any) {
				form.viewed = !form.viewed
				contactFormsCollection.doc(form.id).update({ viewed: form.viewed })
			}

			return { ...toRefs(element), setIcon, toggleViewed }
		},
		firestore: {
			forms: contactFormsCollection.orderBy("createdOn", "desc"),
		},
	})
</script>

<style lang="scss" scoped>
	#message-box {
		max-width: 500px;
		max-height: 500px;
		overflow: auto;
	}
</style>
