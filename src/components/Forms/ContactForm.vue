<template>
	<q-form @submit.prevent.stop="onSubmit" @reset="onReset" class="q-gutter-md">
		<h6 class="q-mb-none">Get In Touch:</h6>
		<q-input
			ref="name"
			type="text"
			label="Company / Rep. Name"
			v-model="form.name"
			outlined
			:dark="dark"
			:color="color"
			:rules="requiredRule"
		>
			<template v-slot:before>
				<q-icon name="account_box" />
			</template>
		</q-input>
		<q-input
			ref="email"
			type="email"
			label="Email"
			v-model="form.email"
			outlined
			:dark="dark"
			:color="color"
			:rules="emailRule"
		>
			<template v-slot:before>
				<q-icon name="mail" />
			</template>
		</q-input>
		<q-input
			type="text"
			label="Website"
			v-model="form.website"
			:dark="dark"
			:color="color"
			outlined
		>
			<template v-slot:before>
				<q-icon name="link" />
			</template>
		</q-input>
		<q-input
			ref="message"
			type="textarea"
			label="Message:"
			v-model="form.message"
			filled
			clearable
			:dark="dark"
			:color="color"
			:rules="requiredRule"
		/>

		<div class="row q-gutter-md q-ma-none q-pa-none">
			<q-btn
				label="Submit"
				type="submit"
				text-color="green"
				icon="send"
				outline
				:loading="submitting"
				class="col"
			>
				<template v-slot:loading>
					<q-spinner-facebook />
				</template>
			</q-btn>
			<q-btn
				label="Clear"
				type="reset"
				text-color="red"
				icon="delete"
				outline
				class="col"
			/>
		</div>
		<FollowLinks />
	</q-form>
</template>

<script lang="ts">
	import { defineComponent, reactive, toRefs } from "@vue/composition-api"
	import { db } from "@/plugins/firebase"
	import FollowLinks from "@/components/FollowLinks.vue"

	export default defineComponent({
		props: {
			dark: {
				type: Boolean,
				default: false,
			},
			color: {
				type: String,
				default: "primary",
			},
		},
		components: {
			FollowLinks,
		},
		setup(props, { refs, root }: any) {
			const element: any = reactive({
				form: {
					name: "",
					email: "",
					website: "",
					message: "",
				},
				formHasError: false,
				submitting: false,
				serviceEmail: "jason.lonsinger@gmail.com",
				requiredRule: [(val: any) => (val && val.length > 0) || "Required"],
				emailRule: [
					(val: any) =>
						(val && /.+@.+\..+/.test(val)) ||
						"Required: In form email@provider.com",
				],
			})

			function onSubmit() {
				element.submitting = true

				// validation
				refs.name.validate()
				refs.email.validate()
				refs.message.validate()

				if (
					refs.name.hasError ||
					refs.email.hasError ||
					refs.message.hasError
				) {
					element.formHasError = true
					return
				}

				//submit logic here
				db.collection("contact-forms")
					.add({ ...element.form, createdOn: new Date(), viewed: false })
					.then(() => {
						root.$q.notify({
							type: "positive",
							message: `Message sent! Thanks for your interest!`,
							progress: true,
							closeBtn: true,
						})

						element.submitting = false
					})
					.catch((err) => {
						console.log(err)

						root.$q.notify({
							type: "negative",
							message: `Looks like there was an error! Please try to contact me through other means!`,
							progress: true,
							closeBtn: true,
						})

						element.submitting = false
					})
			}

			function onReset() {
				element.form = {
					name: "",
					email: "",
					website: "",
					message: "",
				}

				refs.name.resetValidation()
				refs.email.resetValidation()
				refs.message.resetValidation()
			}

			return { ...toRefs(element), onSubmit, onReset, props }
		},
	})
</script>

<style></style>
