import Vue from "vue"
import VueRouter from "vue-router"

let adminRoutes: [] = []

import { auth } from "@/plugins/firebase"

if (process.env.NODE_ENV === "development") {
	adminRoutes = require("./admin").adminRoutes
}

Vue.use(VueRouter)

const baseRoutes = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
		props: false,
		meta: {},
	},
	{
		path: "/about",
		name: "About",
		component: () => import(/* webpackChunkName: "home" */ "@/views/About.vue"),
		props: false,
		meta: {
			hide: true,
		},
	},
	{
		path: "/contact",
		name: "Contact",
		component: () =>
			import(/* webpackChunkName: "home" */ "@/views/Contact.vue"),
		props: false,
		meta: {},
	},
	{
		path: "*",
		name: "404",
		component: () => import(/* webpackChunkName: "home" */ "@/views/404.vue"),
		props: false,
		meta: {
			hide: true,
		},
	},
	{
		path: "/blog",
		name: "Blog",
		alias: "/projects",
		component: () => {
			return import(/* webpackChunkName: "blog" */ "@/views/Blog.vue")
		},
		props: false,
		meta: {},
	},
	{
		path: "/blog/:id",
		name: "BlogPost",
		alias: "/projects/:id",
		component: () => {
			return import(/* webpackChunkName: "blog" */ "@/views/BlogPost.vue")
		},
		props: true,
		meta: {
			hide: true,
		},
	},
]

const routes =
	process.env.NODE_ENV === "development"
		? baseRoutes.concat(adminRoutes as [])
		: baseRoutes

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return {
			x: 0,
			y: 0,
		}
	},
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)

	if (requiresAuth && !auth.currentUser) {
		next({
			path: "/login",
			query: { redirect: to.fullPath },
		})
	} else {
		next()
	}
})

export default router
