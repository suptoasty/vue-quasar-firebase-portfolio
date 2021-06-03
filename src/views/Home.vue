<template>
	<q-page>
		<q-parallax :height="200" :speed="0.5">
			<template v-slot:media>
				<img
					src="https://jasonlonsinger.files.wordpress.com/2019/07/patriot.png?w=1000&h="
				/>
			</template>

			<h1 class="text-white">Jason Lonsinger</h1>
		</q-parallax>

		<div class="row text-white">
			<div class="col column items-center">
				<div class="col">
					<h4>Home</h4>
				</div>
				<q-separator class="q-mb-md" color="white" inset />
			</div>
		</div>

		<div class="row q-col-gutter-md q-pa-sm justify-evenly text-white">
			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				<q-card class="work">
					<q-card-section class="text-h6">
						Hire Me
					</q-card-section>

					<q-separator color="white" inset />

					<q-card-section>
						<p>
							I am currently earning my Bachelors in Computer Science at
							Oklahoma Christian University. I will be open for internships
							spring 2021.
						</p>
					</q-card-section>
				</q-card>
			</div>

			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				<q-card class="work">
					<q-card-section class="text-h6">
						Work With Me
					</q-card-section>

					<q-separator color="white" inset />

					<q-card-section>
						<p>
							I have worked on honing my programming skills in various
							languages. I have used Unix-like OSes for almost 11 years. Along
							with standard C.S. courses, my degree focuses on team product
							development using common 3D design software such as Unreal, Unity,
							Blender, Maya, and 3ds Max.
						</p>
					</q-card-section>
				</q-card>
			</div>

			<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
				<q-card class="work">
					<q-card-section class="text-h6">
						Follow Me
					</q-card-section>

					<q-separator color="white" inset />

					<q-card-section>
						<p>
							Check out the blog section of the site to see previous projects,
							or follow me on any of services the below!
						</p>
						<FollowLinks />
					</q-card-section>
				</q-card>
			</div>
		</div>

		<div class="row q-col-gutter-md q-pa-md justify-center text-white">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-h6">
				About Me:
			</div>

			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				<q-img
					contain
					height="500px"
					src="https://jasonlonsinger.files.wordpress.com/2019/07/cropped-yyygggy.jpg?w=1000"
				>
					<!-- <div class="absolute-bottom-right text-subtitle2 text-center">
						My Favorite color is blue. Hard to tell, right?
					</div> -->
				</q-img>
			</div>

			<div
				class="col-lg-6 col-md-6 col-sm-12 col-xs-12 column items-center justify-center"
			>
				<q-card class="about" style="min-height: 75%; min-width: 75%;">
					<q-card-section class="text-h6">
						Me:
					</q-card-section>

					<q-separator color="white" inset />

					<q-card-section>
						I am a programmer with experience in Java, C++, Python dev as well
						as JS (Node.js), Vue, MySQL web dev.
					</q-card-section>
				</q-card>
			</div>
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
	import FollowLinks from "@/components/FollowLinks.vue"

	export default defineComponent({
		components: {
			FollowLinks,
		},
		setup() {
			const element: any = reactive({})

			onMounted(async () => {})

			return { ...toRefs(element) }
		},
		firestore: {},
	})
</script>

<style scoped lang="scss">
	@import "@/styles/colors.scss";

	.about {
		background: $background-accent;
		color: white;
		// max-width: 85%;
		// min-height: 100%;
	}

	.work {
		background: $background-accent;
		color: white;
		// max-width: 85%;
		min-height: 100%;
	}
</style>
