<template>
	<quasar-tiptap
		v-bind="options"
		class="page-quasar-tiptap-basic non-selectable"
	/>
</template>

<script>
	import { QuasarTiptap } from "quasar-tiptap"
	import "quasar-tiptap/lib/index.css"

	export default {
		name: "page-quasar-tiptap-basic",
		data() {
			return {
				options: {
					content: "",
					editable: false,
					showToolbar: false,
					extensions: [
						"Bold",
						"Italic",
						"Strike",
						"Underline",
						"Code",
						"CodeBlock",
						"CodeBlockHighlight",
						"BulletList",
						"OrderedList",
						"ListItem",
						"TodoList",
						"HorizontalRule",
						"Table",
						"Link",
						// QuasarTipTap
						// 'OTitle',
						// 'ODoc',
						"OLinkBtn",
						"OParagraph",
						"OBlockquote",
						"OTodoItem",
						"OHeading",
						"OAlignment",
						"OIndent",
						"OLineHeight",
						"OForeColor",
						"OBackColor",
						"OFontFamily",
						"OIframe",
						"ODiagram",
						"OKatexBlock",
						"OKatexInline",
						"OFormatClear",
						"OPrint",
						"OImage",
						"OEmbed",
					],
				},
			}
		},
		components: {
			QuasarTiptap,
		},
		methods: {},
		mounted: function() {},
		deactivated() {},
		beforeDestroy() {},
	}
</script>

<style lang="scss">
	.page-quasar-tiptap-basic {
		// .banner {
		// 	height: 100px;
		// }
		width: 75%;

		.tiptap {
			border-color: transparent;
		}

		.editor-scroll-area {
			background: transparent;

			.o-image {
				background: red;
			}
		}

		background: transparent;
	}
</style>
