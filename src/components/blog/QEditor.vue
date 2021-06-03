<template>
	<q-page class="page-quasar-tiptap-all">
		<quasar-tiptap v-bind="options" @update="onUpdate" scrollable>
			<template slot="toolbar-left">
				<q-separator vertical inset />
				<o-menubar-btn
					icon="mdi-overscan"
					:class="{ 'is-active': options.pageView === 'full' }"
					@click.native="options.pageView = 'full'"
				/>
				<o-menubar-btn
					icon="mdi-fit-to-page-outline"
					:class="{ 'is-active': options.pageView === 'page' }"
					@click.native="options.pageView = 'page'"
				/>
			</template>
			<template slot="toolbar-right">
				<o-menubar-btn
					:icon="$q.fullscreen.isActive ? `fullscreen_exit` : `fullscreen`"
					@click.native="$q.fullscreen.toggle()"
					tooltip="action.fullscreen"
				/>
			</template>
		</quasar-tiptap>
	</q-page>
</template>

<script>
	/* eslint-disable */

	import {
		QuasarTiptap,
		// RecommendedExtensions,
		OMenubarBtn,
		OImage,
	} from "quasar-tiptap"
	import "quasar-tiptap/lib/index.css"

	import { Placeholder } from "tiptap-extensions"

	export default {
		data() {
			return {
				options: {
					content: "content",
					editable: true,
					showToolbar: true,
					showBubble: true,
					pageView: "page",
					extensions: [
						// TipTap
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
						new Placeholder({
							showOnlyCurrent: false,
							emptyNodeText: (node) => {
								if (node.type.name === "title") {
									return "Title"
								}
								return "Content"
							},
						}),
					],
					toolbar: [
						// 1.name 2.object 3.component
						{
							name: "add-more", // use object with options
							type: "menu",
							options: {
								embed: {
									video: ["youtube", "bilibili", "youku"],
									map: ["google_map", "amap", "baidu_map"],
									design: ["modao", "lanhu", "figma", "canva", "processon"],
									develop: ["codepen"],
									data: ["google_forms", "jinshuju"],
									others: ["iframe"],
								},
							},
						},
						"separator",
						"bold",
						"italic",
						{
							name: "text-format-dropdown",
							type: "menu",
							options: {
								list: ["underline", "strike", "code"],
							},
						},
						"separator",
						"heading",
						"font-family",
						"fore-color",
						"back-color",
						"format_clear",
						"separator",
						"align-dropdown",
						"indent-dropdown",
						"line-height",
						"separator",
						"horizontal",
						"list-dropdown",
						"separator",
						"blockquote",
						"code_block",
						// 'link',
						"photo",
						"table",
						"separator",
						"print",
					],
					bubble: [
						"bold",
						"italic",
						"separator",
						"font-family",
						"fore-color",
						"back-color",
						"separator",
						"link",
						"separator",
						"align-group",
					],
				},
				isSlideShow: false,
				json: "",
				html: "",
			}
		},
		components: {
			QuasarTiptap,
			OMenubarBtn,
		},
		methods: {
			onUpdate({ getJSON, getHTML }) {
				this.json = getJSON()
				this.html = getHTML()
			},
		},
		mounted() {
			// set language dynamically
			this.$o.lang.set("en-us")
		},
		deactivated() {},
		beforeDestroy() {},
	}
</script>

<style lang="scss">
	.page-quasar-tiptap-all {
		.editor-scroll-area {
			position: absolute;
			top: 40px;
			left: 0;
			right: 0;
			bottom: 0;
			background: #f7f8fa;
		}

		.editor__content {
			background: #fff;
			padding: 40px 50px;
			min-height: calc(100vh - 40px);
		}

		.view-page {
			.editor__content {
				max-width: 800px;
				margin: 1rem auto;
				box-shadow: 0 1px 10px 2px rgba(0, 0, 0, 0.06);
				box-sizing: border-box;
				border: 1px solid #e5e5e5;
			}
		}

		.banner {
			position: relative;
			height: 100px;
			.options {
				position: absolute;
				bottom: 0;
				height: 40px;
				padding: 0 1rem;
			}
		}
		.tiptap {
			border: solid 1px #eeeeee;
			border-radius: 6px;
		}
		.editor-scroll-area {
			position: absolute;
			top: 40px;
			left: 0;
			right: 0;
			bottom: 0;
			background: #f7f8fa;
		}
	}
</style>
