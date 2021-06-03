<template>
	<q-card title="Login">
		<q-card-section>
			<q-form v-on:submit.prevent="login()">
				<q-input v-model.trim="form.email" filled label="Email" type="email">
					<template v-slot:prepend>
						<q-icon name="mail" />
					</template>
				</q-input>

				<br />

				<q-input
					v-model.trim="form.password"
					filled
					label="Password"
					type="password"
				></q-input>

				<br />

				<q-btn type="submit" label="Submit" color="green" outline></q-btn>
			</q-form>
		</q-card-section>

		<!-- <b-button @click="authLogin"></b-button> -->
	</q-card>
</template>

<script lang="ts">
	import { auth, provider } from "@/plugins/firebase"
	import {
		defineComponent,
		onMounted,
		reactive,
		toRefs,
	} from "@vue/composition-api"
	import store from "@/store"

	export default defineComponent({
		setup(props: any, context: any) {
			const { $store } = context.root
			const element: any = reactive({
				form: {
					email: "",
					password: "",
				},
			})

			function authLogin() {
				auth
					.signInWithPopup(provider)
					.then((result: any) => {
						// This gives you a Google Access Token. You can use it to access the Google API.
						var token = result.credential.accessToken
						// The signed-in user info.
						var user = result.user

						console.log("Token: " + token)
						console.log("User: " + JSON.stringify(user))

						store.dispatch("login", {
							email: user.email,
							credential: result.credential,
						})
					})
					.catch(function(error) {
						// Handle Errors here.
						var errorCode = error.code
						var errorMessage = error.message
						// The email of the user's account used.
						var email = error.email
						// The firebase.auth.AuthCredential type that was used.
						var credential = error.credential

						console.log("ErrorCode: " + errorCode)
						console.log("ErrorMessage: " + errorMessage)
						console.log("Email: " + email)
						console.log("Credential: " + credential)
					})
			}

			onMounted(() => {})

			function login() {
				$store.dispatch("login", {
					email: element.form.email,
					password: element.form.password,
				})
			}

			return { ...toRefs(element), login, authLogin }
		},
	})
</script>
