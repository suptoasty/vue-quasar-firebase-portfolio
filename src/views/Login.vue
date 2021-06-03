<template>
	<q-page padding>
		<LoginForm />
	</q-page>
</template>

<script lang="ts">
	import LoginForm from "@/components/Forms/LoginForm.vue"
	import { defineComponent } from "@vue/composition-api"
	// import { reactive, toRefs } from "@vue/composition-api";

	export default defineComponent({
		components: {
			LoginForm,
		},
		setup() {
			// const element = reactive({
			//   loginForm: {
			//     email: "",
			//     password: "",
			//   },
			// });
			// function login() {
			//   this.$store.dispatch("login", {
			//     email: this.loginForm.email,
			//     password: this.loginForm.password,
			//   });
			// }
			// function register() {
			//   this.$store.dispatch("register", {
			//     email: this.loginForm.email,
			//     password: this.loginForm.password,
			//   });
			// }
			// return { ...toRefs(element), login };
		},
	})
</script>

<style></style>
