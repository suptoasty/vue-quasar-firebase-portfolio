<template>
	<!-- <q-header class="navbar" reveal elevated> -->
	<q-toolbar class="navbar">
		<q-btn to="/" flat stretch label="Home" />
		<q-space />
		<q-tabs stretch shrink no-caps mobile-arrows v-if="!collapseMenu">
			<q-route-tab
				v-for="route in $router.options.routes"
				:key="route.path"
				:to="route.path"
				:name="route.name"
				:label="route.name === 'Blog' ? 'Projects' : route.name"
				v-show="showRoute(route)"
			></q-route-tab>
			<q-btn v-if="showNav" flat stretch>
				<q-menu
					:content-style="{ backgroundColor: 'rgba(255, 255, 255, 0)' }"
					content-class="short-menu"
				>
					<q-list>
						<q-item-label header>Action</q-item-label>
						<q-item clickable @click="logout">
							<q-item-section>Logout</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
				<q-avatar>
					<img src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
				</q-avatar>
			</q-btn>
		</q-tabs>
		<q-btn v-else icon="menu" round flat>
			<q-menu
				content-class="wide-menu"
				:content-style="{ backgroundColor: 'rgba(255, 255, 255, 0)' }"
				:scroll-target="$refs.scrollTarget"
				:offset="[0, 5]"
			>
				<q-list ref="scrollTarget" style="max-width: 100%;">
					<q-item
						v-for="route in $router.options.routes"
						:key="route.path"
						:to="route.path"
						:name="route.name"
						:label="route.name"
						active-class="active"
						v-show="showRoute(route)"
						clickable
						v-ripple
					>
						<q-item-section>
							<q-item-label>
								{{ route.name === "Blog" ? "Projects" : route.name }}
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-separator color="white" />
					<q-item clickable v-if="showNav" @click="logout" label="Logout">
						<q-item-section>
							<q-item-label>Logout</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</q-btn>
	</q-toolbar>
	<!-- </q-header> -->
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		onMounted,
		reactive,
		toRefs,
	} from "@vue/composition-api"

	export default defineComponent({
		setup(props: Object, context) {
			const element: any = reactive({
				...props,
				userProfile: computed(() => context.root.$store.state.userProfile),
				showNav: computed(() => Object.keys(element.userProfile).length > 1),
				collapseMenu: computed(() => {
					let q = context.root.$q
					return q.screen.width <= q.screen.sizes.lg - q.screen.sizes.lg / 4
				}),
			})

			function logout() {
				return context.root.$store.dispatch("logout")
			}

			function showRoute(route: any) {
				if (route.name == "Home") return false

				if (process.env.NODE_ENV !== "production") {
					return true
				} else {
					return !route.meta.hide
				}
			}

			onMounted(() => {})

			return { ...toRefs(element), showRoute, logout }
		},
	})
</script>

<style lang="scss" scoped>
	@import "@/styles/colors.scss";

	.active {
		color: $green;
	}

	.navbar {
		color: white;
		background: $background;
		// color: white;
		// background: $orion-white-translucent;
		// box-shadow: $orion-drop-shadow;

		.q-tabs {
			.q-tab:hover {
				color: $green;
			}
		}

		.q-btn:hover {
			color: $green;
		}
	}

	.wide-menu {
		.q-list {
			width: 100vmax;
			background-color: $background-accent;
			color: white;

			.q-item {
				width: 100%;
				text-align: left;
				color: white;

				.q-item-section {
					width: 100%;
				}
			}

			.q-item:hover {
				width: 100%;
				text-align: left;
				color: $green;

				.q-item-section {
					// width: 100%;
				}
			}
		}
	}

	.short-menu {
		.q-list {
			background-color: $background-accent;
			color: white;

			.q-item {
				width: 100%;
				text-align: left;
				color: white;

				.q-item-section {
					width: 100%;
				}
			}

			.q-item:hover {
				width: 100%;
				text-align: left;
				color: $green;

				.q-item-section {
					width: 100%;
				}
			}
		}
	}
</style>
