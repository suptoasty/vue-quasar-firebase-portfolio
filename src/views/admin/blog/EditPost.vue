<template>
	<q-page padding>
		<q-card class="q-pa-md">
			<q-form v-on:submit.prevent="false" class="q-gutter-md" autofocus>
				<q-input outlined type="text" v-model="post.title" label="title" />
				<q-input
					outlined
					type="text"
					v-model="post.description"
					label="description"
				/>
				<!-- <q-file v-model="file" label="Cover Image" outlined /> -->
				<q-input
					outlined
					type="text"
					v-model="post.image"
					label="cover image"
				/>

				<q-toggle label="Featured" v-model="post.featured" />

				<q-toggle label="Hidden" v-model="post.hidden" />

				<CategoryBox
					ref="editor"
					:edit="true"
					v-on:updated="post.categories = $event"
				/>

				<!-- <Editor :content="post.content" ref="editor" /> -->
				<QEditor ref="editor" />
				<q-btn @click="save" label="Save" color="secondary" outline></q-btn>
				<q-btn
					@click="$router.go(-1)"
					label="Cancel"
					color="yellow"
					outline
				></q-btn>
				<q-btn
					@click="showDialogue = !showDialogue"
					label="Delete"
					color="red"
					outline
					class="float-right"
				></q-btn>
			</q-form>
		</q-card>

		<q-dialog v-model="showDialogue" persistent>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar icon="delete" color="warning" text-color="red" />
					<span class="q-ml-sm"
						>Are you sure you want to delete this post? {{ id }}</span
					>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn outline label="Cancel" color="green" v-close-popup />
					<q-btn
						outline
						label="Delete"
						color="red"
						v-close-popup
						@click="deleteDoc"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</q-page>
</template>

<script lang="ts">
/* eslint-disable */

import {
	reactive,
	toRefs,
	onMounted,
	defineComponent,
} from "@vue/composition-api";
import CategoryBox from "@/components/blog/CategoryBox.vue";
import { postsCollection, auth } from "@/plugins/firebase";
import QEditor from "@/components/blog/QEditor.vue";

export default defineComponent({
	name: "BlogPost",
	props: {
		id: {
			type: String,
			default: "",
		},
		isAdd: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		CategoryBox,
		QEditor,
	},
	setup(props: any, context: any) {
		const { $router } = context.root;
		const element: any = reactive({
			post: {},
			showDialogue: false,
			file: [],
		});

		function getBase64(file: any) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		}

		async function save() {
			element.post.content = context.refs.editor.html;

			if (props.isAdd) {
				if (element.file) {
					await getBase64(element.file).then((image) => {
						element.post.image = image;
					});
				}

				postsCollection.add(element.post).then((doc) => {
					props.id = doc.id;
					$router.go(-1);
				});
			}

			postsCollection
				.where("__name__", "==", props.id)
				.get()
				.then((collection) => {
					collection.forEach((doc) => {
						postsCollection
							.doc(doc.id)
							.update(element.post)
							.then(() => {
								$router.go(-1);
							});
					});
				});
		}

		function deleteDoc() {
			if (props.isAdd) {
				context.root.$router.go(-1);
			} else {
				postsCollection
					.doc(props.id)
					.delete()
					.then(() => {
						context.root.$router.push({ name: "Blog" });
					});
			}
		}

		onMounted(async () => {
			if (props.isAdd) {
				element.post = {
					categories: [],
					comments: 0,
					content: "",
					createdOn: new Date(),
					description: "",
					featured: false,
					image: "",
					likes: 0,
					hidden: false,
					title: "",
					views: 0,
					userId: auth.currentUser?.uid,
					userName: context.root.$store.state.userProfile.name,
				};
			} else {
				postsCollection
					.doc(props.id)
					.get()
					.then((doc) => {
						element.post = doc.data();
						context.refs.editor.options.content = element.post.content;
					});
			}
		});

		return { ...toRefs(element), save, deleteDoc };
	},
});
</script>

<style></style>
