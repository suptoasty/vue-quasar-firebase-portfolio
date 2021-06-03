<template>
	<q-page padding class="text-white non-selectable">
		<div class="column items-center">
			<div class="column items-center">
				<q-btn
					v-if="showNav"
					:to="{ name: 'EditPost', params: { id: id } }"
					outline
					color="green"
					class="col"
				>
					Edit
				</q-btn>
			</div>

			<!-- <div class="text-h5 row">
				<span v-for="category in post.categories" :key="category.label">
					{{ category.label + ", " }}
				</span>
			</div> -->
			<p class="text-h3 col">{{ post.title }}</p>
			<p class="text-subtitle1 col">{{ post.subtitle }}</p>
			<p class="text-caption col">
				<i>Posted by </i>
				{{ post.userName }}
				<i> on </i>
				{{ post.createdOn ? getDate(post.createdOn) : "" }}
			</p>
			<QViewer ref="viewer" class="col" />
		</div>
	</q-page>
</template>

<script lang="ts">
	import {
		onMounted,
		reactive,
		toRefs,
		computed,
		defineComponent,
	} from "@vue/composition-api"
	import { postsCollection } from "@/plugins/firebase"
	import print from "@/components/utils"
	import { date } from "quasar"
	import QViewer from "@/components/blog/QViewer.vue"

	export default defineComponent({
		name: "BlogPost",
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		components: {
			QViewer,
		},
		setup(props: any, context: any) {
			const element: any = reactive({
				userProfile: computed(() => context.root.$store.state.userProfile),
				showNav: computed(() => Object.keys(element.userProfile).length > 1),
				post: {},
			})
			const { isAdmin } = print(0)

			function getDate(timestamp: any) {
				return date.formatDate(timestamp.toDate(), "MMMM D, YYYY")
			}

			onMounted(() => {
				postsCollection.doc(props.id).onSnapshot((doc) => {
					element.post = doc.data()
					context.refs.viewer.options.content = element.post.content
					if (!isAdmin.value) {
						// postsCollection
						// 	.doc(props.id)
						// 	.update({ views: doc.data().views + 1 })
					}
				})
			})

			return { ...toRefs(element), getDate }
		},
		firestore: {
			// post: postsCollection.doc().get()
		},
	})
</script>

<style scoped lang="scss"></style>
