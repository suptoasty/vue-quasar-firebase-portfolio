<template>
	<q-carousel
		v-model="slide"
		swipeable
		animated
		:thumbnails="!autoplay"
		infinite
		transition-next="slide-left"
		transition-prev="slide-right"
		:autoplay="autoplay"
		v-if="hide"
		@mouseenter="autoplay = false"
		@mouseleave="autoplay = true"
	>
		<q-carousel-slide
			v-for="(post, index) in featuredPosts"
			:img-src="post.image"
			:key="post.id"
			:name="index"
			class="cursor-pointer"
			@click="$router.push({ name: 'BlogPost', params: { id: post.id } })"
		>
			<div
				:class="
					$q.screen.lt.md
						? 'absolute-top carousel-text-sm'
						: 'absolute-top carousel-text'
				"
			>
				<div v-if="!$q.screen.lt.md">
					<div class="text-h2">{{ post.title }}</div>
					<div class="text-subtitle1">{{ post.description }}</div>
				</div>
				<div v-else>
					<div class="text-h6">{{ post.title }}</div>
					<div class="text-subtitle1">{{ post.description }}</div>
				</div>
			</div>
		</q-carousel-slide>
	</q-carousel>
</template>

<script>
	import { featuredPostsQuery } from "@/plugins/firebase"
	import { computed, onMounted, reactive, toRefs } from "@vue/composition-api"

	export default {
		setup() {
			const element = reactive({
				hide: computed(() => !(element.featuredPosts.length <= 0)),
				slide: 0,
				featuredPosts: [],
				autoplay: true,
			})

			onMounted(async () => {
				// featuredPosts.onSnapshot((response) => {
				// 	element.featuredPosts = response.docs
				// 		.map((doc) => {
				// 			return { id: doc.id, ...doc.data() }
				// 		})
				// 		.filter((doc) => !doc.hidden)
				// 	element.slide = element.featuredPosts[0].id // set first slide to show (name on slide tag and id on document)
				// })
			})

			return { ...toRefs(element) }
		},
		firestore: {
			featuredPosts: featuredPostsQuery.orderBy("createdOn", "desc").limit(5),
		},
	}
</script>

<style lang="scss" scoped>
	.carousel-text {
		text-align: center;
		padding: 12px;
		color: black;
		left: 25%;
		right: 25%;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.carousel-text-sm {
		text-align: center;
		// padding: 12px;
		color: black;
		// left: 25%;
		// right: 25%;
		background-color: rgba(255, 255, 255, 0.3);
	}
</style>
