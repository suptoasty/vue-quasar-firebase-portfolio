<template>
	<q-page>
		<FeaturedCarousel />

		<div v-if="isAdmin" class="column items-center q-mt-sm q-mb-sm">
			<div class="row q-gutter-md">
				<q-btn
					label="Add Post"
					outline
					color="green"
					@click="
						$router.push({
							name: 'EditPost',
							params: { id: 'new', isAdd: true },
						})
					"
				/>
				<q-btn label="Export All" outline color="blue" @click="exportJSON" />
				<q-file v-model="file" label="Import File" outlined color="yellow" />
				<q-btn label="Import" color="yellow" outline @click="importJSON" />
			</div>
		</div>

		<div class="row justify-center q-gutter-sm q-mb-md q-mt-sm">
			<q-card class="card-controls col-lg-11 col-md-11 col-sm-7 col-xs-7">
				<SearchCategoryBox
					:dark="true"
					@updated="categories = $event"
					@update-search="searchTerm = $event"
				/>

				<q-toggle
					color="green"
					label="Featured Only"
					v-model="featuredOnly"
					keep-color
				/>
			</q-card>
		</div>

		<div class="row q-col-gutter-sm">
			<q-intersection
				once
				transition="scale"
				class="column items-center col-lg-4 col-md-6 col-sm-12 col-xs-12"
				v-for="post in filter"
				:key="post.id"
			>
				<BlogCard
					:post="post"
					@delete="
						showDialogue = !showDialogue;
						deleteID = $event;
					"
				/>
			</q-intersection>
		</div>

		<q-dialog v-model="showDialogue" v-if="isAdmin" persistent>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar icon="delete" color="warning" text-color="red" />
					<span class="q-ml-sm"
						>Are you sure you want to delete this post? {{ deleteID }}</span
					>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn outline label="Cancel" color="green" v-close-popup />
					<q-btn
						outline
						label="Delete"
						color="red"
						v-close-popup
						@click="deletePost()"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</q-page>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onMounted,
	reactive,
	toRefs,
} from "@vue/composition-api";
import { postsCollection } from "@/plugins/firebase";
import BlogCard from "@/components/blog/BlogCard.vue";
import FeaturedCarousel from "@/components/blog/FeaturedCarousel.vue";
import SearchCategoryBox from "@/components/blog/SearchCategoryBox.vue";
import print from "@/components/utils";
import firebase from "firebase";

export default defineComponent({
	name: "Blog",
	components: {
		BlogCard,
		FeaturedCarousel,
		SearchCategoryBox,
	},
	setup() {
		const element: any = reactive({
			posts: [],
			searchTerm: "",
			featuredOnly: false,
			categories: [],
			showDialogue: false,
			deleteID: "",
			file: null,

			// computed filter for posts
			filter: computed(() => {
				let data = element.posts;
				// console.log(data)

				// hide cards marked hidden unless admin
				if (!isAdmin.value) {
					data = data.filter((post: any) => !post.hidden);
				}

				// filter cards by categories exclusive
				if (element.categories.length > 0) {
					element.categories.forEach((category: any) => {
						data = data.filter((post: any) =>
							post.categories
								.map((cat: any) => cat.label)
								.includes(category.label)
						);
					});
				}

				// !!!!!!!! Find way to make category search inclusive

				// filter cards using key search terms
				if (element.searchTerm !== null) {
					data = data.filter(
						(post: any) =>
							String(post.title)
								.toLowerCase()
								.includes(String(element.searchTerm).toLowerCase()) ||
							String(post.description)
								.toLowerCase()
								.includes(String(element.searchTerm).toLowerCase())
					);
				}

				// show only featured only cards
				if (element.featuredOnly) {
					data = data.filter((post: any) => post.featured === true);
				}

				return data;
			}),
		});
		const { isAdmin } = print(0);

		function deletePost() {
			if (process.env.NODE_ENV === "development") {
				postsCollection.doc(element.deleteID).delete();
			}
		}

		function importJSON() {
			(element.file as File).text().then((res) => {
				const posts = JSON.parse(res);

				posts.forEach((post: any) => {
					let { createdOn } = post;
					const timeStamp = new firebase.firestore.Timestamp(
						createdOn.seconds,
						createdOn.nanoseconds
					);

					post.createdOn = timeStamp;
					postsCollection.add(post);
				});
			});
		}

		function exportJSON() {
			const el = document.createElement("a");
			el.setAttribute(
				"href",
				"data:text/plain;charset=utf-8," +
					encodeURIComponent(JSON.stringify(element.posts))
			);
			el.setAttribute("download", "blog.json");

			el.style.display = "none";
			document.body.appendChild(el);

			el.click();

			document.body.removeChild(el);
		}

		// function importJSON() {

		// }

		onMounted(async () => {});

		return { ...toRefs(element), deletePost, exportJSON, importJSON, isAdmin };
	},
	firestore: {
		posts: postsCollection.orderBy("createdOn", "desc"),
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

// .q-expansion-item {
// 	background-color: $background-accent;
// 	width: 50%;
// 	max-width: 75%;

// 	.q-card {
// 		background: $background-accent-dark;
// 		color: white;
// 	}
// }

.card-controls {
	background-color: $background-accent;
	color: white;
}
</style>
