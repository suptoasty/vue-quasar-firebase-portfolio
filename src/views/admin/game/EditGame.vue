<template>
	<q-page padding>
		<q-card>
			<q-form @submit.prevent="">
				<q-input
					id="title-input"
					:placeholder="Game.title"
					v-model.trim="Game.title"
					label="Title"
					type="text"
				/>

				<q-input
					id="subtitle-input"
					:placeholder="Game.subtitle"
					v-model.trim="Game.subtitle"
					label="SubTitle"
					type="text"
				/>

				<q-input
					id="description-input"
					:placeholder="Game.description"
					v-model.trim="Game.description"
					label="Description"
					type="textarea"
				/>

				<q-input v-model.trim="Game.image" label="Image URL"></q-input>
				<br />
				<q-input v-model.trim="Game.imagealt" label="Image Alt"></q-input>
				<br />
				<q-img
					rounded
					contain
					:src="Game.image"
					style="max-width: 50%; max-height: 50%;"
				/>
				<br />

				<q-btn-group>
					<q-btn @click="save()" label="Save"></q-btn>
					<q-btn @click="$router.go(-1)" label="Cancel"></q-btn>
				</q-btn-group>
			</q-form>
		</q-card>
	</q-page>
</template>

<script lang="ts">
	// @ is an alias to /src
	import {
		defineComponent,
		onMounted,
		reactive,
		toRefs,
	} from "@vue/composition-api"
	import { gamesCollection } from "@/plugins/firebase"

	export default defineComponent({
		// props: ["title", "subtitle", "id", "description", "image", "imagealt", "tag"],
		props: {
			add: {
				type: Boolean,
				required: true,
				default: false,
			},
			title: {
				type: String,
				required: false,
			},
			subtitle: {
				type: String,
				required: false,
			},
			id: {
				type: String,
				required: false,
				default: "",
			},
			description: {
				type: String,
				required: false,
			},
			shortdescription: {
				type: String,
				required: false,
			},
			image: {
				type: String,
				required: false,
			},
			imagealt: {
				type: String,
				required: false,
			},
		},
		setup(props, { root }) {
			const { $router } = root
			const element: any = reactive({
				Game: {
					title: "",
					subtitle: "",
					description: "",
					shortdescription: "",
					image: "",
					imagealt: "",
				},
			})

			function save() {
				if (props.add) {
					delete element.Game.id
					element.Game.shortdescription = element.Game.description
						.slice(0, 97)
						.split(" ")
						.slice(0, -1)
						.join(" ")
						.concat("...")

					gamesCollection.add(element.Game)
					$router.go(-1)
				} else {
					gamesCollection
						.where("__name__", "==", props.id)
						.get()
						.then((collection) => {
							collection.forEach((doc) => {
								element.Game.shortdescription = element.Game.description
									.slice(0, 97)
									.split(" ")
									.slice(0, -1)
									.join(" ")
									.concat("...")

								delete element.Game.id
								gamesCollection
									.doc(doc.id)
									.update(element.Game)
									.then(() => {
										$router.go(-1)
									})
							})
						})
				}
			}

			onMounted(() => {
				element.Game = Object.assign({}, props) // deep copy
				delete element.Game.add
				console.log(props)
			})

			return { ...toRefs(element), save }
		},
	})
</script>

<style scoped lange="scss"></style>
