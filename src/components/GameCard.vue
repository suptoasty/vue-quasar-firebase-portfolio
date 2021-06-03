<template>
  <section id="GameCard">
    <div v-if="add">
      <q-card
        class="non-selectable cursor-pointer"
        :style="styling()"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <q-card-section class="text-h5">
          Add New
          <br />
          <q-icon name="add_circle_outline" size="lg"></q-icon>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <q-card
        class="non-selectable cursor-pointer"
        :style="styling()"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <q-card-section>
          <q-img :src="image" :alt="imagealt"></q-img>
          <div class="text-h6">{{ title }}</div>
          <div class="text-subtitle2">
            {{ subtitle }}
          </div>
          <p class="text-justify">{{ text }}</p>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script>
import { getRandomAngle, generateGradient } from "@/components/utils";
import { reactive, toRefs } from "@vue/composition-api";

export default {
  name: "GameCard",
  props: {
    width: {
      type: Number,
      required: false,
      default: 250
    },
    height: {
      type: Number,
      required: false,
      default: 300
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    subtitle: {
      type: String,
      required: false,
      default: ""
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: ""
    },
    imagealt: {
      type: String,
      required: false,
      default: "Image"
    },
    tag: {
      type: String,
      required: false,
      default: "None"
    },
    add: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup() {
    const element = reactive({
      hover: false,
      gradientOne: generateGradient(),
      gradientTwo: generateGradient(),
      gradientAngle: getRandomAngle()
      // stylePreventDrag: computed(() => {
      //   return `
      // 		-webkit-user-drag: none;
      // 		-khtml-user-drag: none;
      // 		-moz-user-drag: none;
      // 		-o-user-drag: none;
      // 		user-drag: none;
      // 	`;
      // }),
      // stylePreventSelection: computed(() => {
      //   return `
      // 		-moz-user-select: none;
      // 		-khtml-user-select: none;
      // 		-webkit-user-select: none;
      // 		-ms-user-select: none;
      // 		user-select: none;
      // 	`;
      // })
    });

    function styling() {
      if (this.hover)
        return (
          "" +
          "width: " +
          this.width +
          "px;" +
          "height: " +
          this.height +
          "px;" +
          "transform: translate3D(0,-1px,0) scale(1.09); /* move up slightly and zoom in */" +
          "box-shadow: 8px 14px 38px " +
          this.gradientOne +
          ", 1px 3px 8px " +
          this.gradientTwo +
          ";" +
          "transition: all .4s ease; /* zoom in */" +
          "cursor: pointer;" +
          "background-image: linear-gradient(" +
          this.gradientAngle +
          "deg, " +
          this.gradientOne +
          " 0%, " +
          this.gradientTwo +
          " 100%);" +
          "padding: 0.25rem;" +
          "-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */" +
          "-moz-box-sizing: border-box;    /* Firefox, other Gecko */" +
          "box-sizing: border-box;         /* Opera/IE 8+ */"
        );
      else
        return (
          "" +
          "width: " +
          this.width +
          "px;" +
          "height: " +
          this.height +
          "px;" +
          "background-color: " +
          this.gradientOne +
          ";" +
          "background-image: linear-gradient(" +
          this.gradientAngle +
          "deg, " +
          this.gradientOne +
          " 0%, " +
          this.gradientTwo +
          " 100%);" +
          "box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);" +
          "transition: all .5s ease; /* back to normal */" +
          "overflow: hidden;"
        );
    }

    return { ...toRefs(element), styling };
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  &::v-deep {
    border-radius: 35px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.q-img {
  &::v-deep {
    border-radius: 35px;
  }
}
</style>
