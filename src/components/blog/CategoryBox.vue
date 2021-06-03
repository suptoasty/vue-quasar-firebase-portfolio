<template>
	<q-select
		outlined
		v-model="selection"
		:options="options"
		use-chips
		stack-label
		multiple
		map-options
		emit-value
		use-input
		input-debounce="0"
		:dark="dark"
		color="green"
		@new-value="addNewCategory"
		@input="update"
		@clear="update"
		@filter="searchFilter"
		label="Categories"
	>
		<template v-slot:option="scope">
			<q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
				<q-item-section>
					<q-item-label v-html="scope.opt.label"></q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle
						color="green"
						v-model="selection"
						:val="scope.opt.value"
					></q-toggle>
				</q-item-section>
			</q-item>
		</template>
		<template v-if="selection.length > 0" v-slot:append>
			<q-icon
				name="cancel"
				@click.stop="selection = []"
				@click="update"
				class="cursor-pointer"
			/>
		</template>
	</q-select>
</template>

<script>
	import {
		defineComponent,
		onMounted,
		reactive,
		toRefs,
	} from "@vue/composition-api"
	import { categoriesDoc } from "@/plugins/firebase"

	export default defineComponent({
		props: {
			edit: {
				type: Boolean,
				required: false,
				default: false,
			},
			dark: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		setup(props, { emit }) {
			const element = reactive({
				selection: [], // actual selection of items
				options: [], // filtered array !- data can be lost
				categories: [], // untouched array of categories
			})

			function searchFilter(value, update, abort) {
				update(
					() => {
						const needle = value.toLocaleLowerCase()
						element.options = element.categories.filter((cat) =>
							cat.label.toLocaleLowerCase().includes(needle)
						)
					},
					() => {}
				)

				abort(() => {
					console.log("abort")
				})
			}

			function update() {
				emit(
					"updated",
					element.options.filter((category) =>
						element.selection.includes(category.value)
					)
				)
			}

			function addNewCategory(category, done) {
				if (
					!element.options.map((cat) => cat.label).includes(category) &&
					category.length >= 3 &&
					props.edit
				) {
					element.categories.push({ label: category, value: category })

					categoriesDoc.update({
						categories: element.categories.map((cat) => cat.label),
					})
					element.options = element.categories
				}

				done({ label: category, value: category }, "toggle")
			}

			onMounted(() => {
				categoriesDoc.onSnapshot((doc) => {
					element.categories = doc.data().categories.map((category) => {
						return { label: category, value: category }
					})
					element.options = element.categories
				})
			})

			return { ...toRefs(element), update, addNewCategory, searchFilter }
		},
	})
</script>

<style lang="scss" scoped></style>
