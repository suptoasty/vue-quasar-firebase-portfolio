const adminRoutes = [
	{
		path: "/GameListing",
		name: "GameListing",
		props: false,
		component: () =>
			import(
				/* webpackChunkName: "admin" */ "@/views/admin/game/GameListing.vue"
			),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path:
			"/EditGame/:title/:subtitle/:id/:description/:shortdescription/:image/:imagealt/:add",
		name: "EditGame",
		component: () =>
			import(/* webpackChunkName: "admin" */ "@/views/admin/game/EditGame.vue"),
		props: true,
		meta: {
			requiresAuth: true,
			hide: true,
		},
	},
	{
		path: "/EditPost/:id/",
		name: "EditPost",
		component: () =>
			import(/* webpackChunkName: "admin" */ "@/views/admin/blog/EditPost.vue"),
		props: true,
		meta: {
			requiresAuth: true,
			hide: true,
		},
	},
	{
		path: "/dashboard/",
		name: "Dashboard",
		component: () =>
			import(/* webpackChunkName: "admin" */ "@/views/admin/Dashboard.vue"),
		props: true,
		meta: {
			requiresAuth: true,
			hide: true,
		},
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
		props: false,
		meta: {},
	},
]

export { adminRoutes }
