<template>
	<q-page>
		<div class="row">
			<GameCard
				style="margin: 1rem;"
				v-for="game in games"
				:key="game.id"
				:image="game.image"
				:title="game.title"
				:subtitle="game.subtitle"
				:text="game.shortdescription"
				:imagealt="game.imagealt"
				@click.native="
					$router.push({ name: 'EditGame', params: { ...game, add: false } })
				"
			></GameCard>
		</div>

		<div class="row">
			<!-- Add Card -->
			<GameCard
				style="margin: 1rem;"
				add
				@click.native="
					$router.push({ name: 'EditGame', params: { add: true } })
				"
			>
			</GameCard>
		</div>
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
	import GameCard from "@/components/GameCard.vue"
	import { gamesCollection } from "@/plugins/firebase"

	export default defineComponent({
		components: {
			GameCard,
		},
		setup() {
			const element: any = reactive({
				games: [],
				add: false,
			})

			onMounted(async () => {
				// const citiesRef = db.collection("games")
				// const snapshot = await citiesRef.get()
				// snapshot.forEach((doc) => {
				// 	element.games.push({ id: doc.id, ...doc.data() })
				// })
			})

			return { ...toRefs(element) }
		},
		firestore: {
			games: gamesCollection,
		},
	})
</script>
<style></style>
