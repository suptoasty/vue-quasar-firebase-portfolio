<template>
	<q-card
		:class="
			$q.screen.lt.sm
				? 'blog-card-medium non-selectable cursor-pointer'
				: 'blog-card non-selectable cursor-pointer'
		"
		@click="$router.push({ name: 'BlogPost', params: { id: post.id } })"
	>
		<q-img
			:src="post.image"
			:placeholder-src="require('@/assets/images/scared-batman.jpg')"
			:class="$q.screen.lt.sm ? 'card-image-medium row' : 'card-image row'"
		>
			<template v-slot:error>
				<div class="absolute-full flex flex-center text-white">
					Cannot load image
				</div>
				<div v-if="isAdmin" class="tools">
					<q-icon
						class="all-pointer-events"
						size="32px"
						name="create"
						color="green"
						style="top: 8px; left: 8px"
						@click.stop="
							$router.push({ name: 'EditPost', params: { id: post.id } })
						"
					>
						<q-tooltip>
							Edit This Blog Post
						</q-tooltip>
					</q-icon>

					<q-icon
						class="all-pointer-events"
						size="32px"
						name="delete_forever"
						color="red"
						style="top: 8px; left: 8px"
						@click.stop="$emit('delete', post.id)"
					>
						<q-tooltip>
							Delete This Blog Post
						</q-tooltip>
					</q-icon>
				</div>
			</template>

			<!-- <q-icon
				class="all-pointer-events"
				size="32px"
				name="stars"
				color="grey"
				style="top: 8px; left: 8px"
			>
				<q-tooltip>
					Add To Favorites
				</q-tooltip>
			</q-icon> -->
			<div v-if="isAdmin" class="tools">
				<q-icon
					class="all-pointer-events"
					size="32px"
					name="create"
					color="green"
					style="top: 8px; left: 8px"
					@click.stop="
						$router.push({ name: 'EditPost', params: { id: post.id } })
					"
				>
					<q-tooltip>
						Edit This Blog Post
					</q-tooltip>
				</q-icon>

				<q-icon
					class="all-pointer-events"
					size="32px"
					name="delete_forever"
					color="red"
					style="top: 8px; left: 8px"
					@click.stop="$emit('delete', post.id)"
				>
					<q-tooltip>
						Delete This Blog Post
					</q-tooltip>
				</q-icon>
			</div>
		</q-img>

		<q-card-section
			:class="$q.screen.gt.xs ? 'q-pt-none' : 'q-pt-none q-pb-none'"
		>
			<div v-if="post.featured" class="text-overline text-orange-9">
				Featured
			</div>
			<div v-else class="text-overline text-blue-6">
				{{ post.createdOn ? getDate(post.createdOn) : "" }}
			</div>
			<div :class="$q.screen.gt.xs ? 'text-h6' : ''">{{ post.title }}</div>
			<div v-if="$q.screen.gt.xs && post.description" class="text-grey">
				{{ post.description }}
			</div>
			<br v-else-if="!$q.screen.lt.sm" />
		</q-card-section>

		<q-separator v-if="$q.screen.gt.xs" inset color="blue-grey-1" />

		<q-card-section v-if="$q.screen.gt.xs" class="q-pt-lg">
			<div class="row">
				<span v-for="(category, index) in post.categories" :key="index">
					<span style="margin-right: 5px; overflow: auto;">
						#{{ category.label }}
					</span>
				</span>
				<q-space />
				<div style="float-right">
					<q-icon name="visibility" /> {{ post.views }}
				</div>
			</div>
		</q-card-section>

		<q-card-section v-else>
			<q-separator color="white" />
			<span v-for="(category, index) in post.categories" :key="index">
				<span style="margin-right: 5px; overflow: auto;">
					#{{ category.label }}
				</span>
			</span>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
	import { defineComponent, reactive, toRefs } from "@vue/composition-api"
	import print from "@/components/utils"
	import { date } from "quasar"

	export default defineComponent({
		props: {
			post: {
				type: Object,
				required: true,
				default: new Object(),
			},
		},
		setup() {
			const element: any = reactive({})
			const { isAdmin } = print(0)

			function getDate(timestamp: any) {
				return date.formatDate(timestamp.toDate(), "MMMM D, YYYY")
			}

			return { ...toRefs(element), getDate, isAdmin }
		},
	})
</script>

<style lang="scss" scoped>
	@import "@/styles/colors.scss";

	.q-img {
		div .tools {
			background: $orion-white-translucent;
			right: 0%;
			top: 0%;
			padding-top: 0;
			padding-left: 0;
		}
	}

	.blog-card {
		width: 500px;
		height: 425px;

		min-width: 250px;
		min-height: 212px;

		max-width: 500px;
		max-height: 425px;

		background: $background-accent;

		color: white;
	}

	.card-image {
		width: 500px;
		height: 250px;

		min-width: 250px;
		min-height: 212px;

		max-width: 500px;
		max-height: 250px;
	}

	.blog-card-medium {
		width: 250px;
		height: 250px;

		min-width: 250px;
		min-height: 250px;

		max-width: 250px;
		max-height: 250px;

		background: $background-accent;

		color: white;
	}

	.card-image-medium {
		// width: 250px;
		// height: 125px;
		width: auto;
		height: auto;

		min-width: 125px;
		min-height: 125px;

		max-width: 250px;
		max-height: 125px;
	}

	.blog-card-small {
		background: $background-accent;
		color: white;
	}
</style>
