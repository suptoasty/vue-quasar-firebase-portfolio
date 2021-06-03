<template>
  <div class="container">
    <div v-for="doc in documents" :key="doc">
      {{ doc }}
    </div>
  </div>
</template>

<script>
// import { db } from "@/plugins/firebase";
import { reactive, toRefs } from "@vue/composition-api";

export default {
  name: "DisplayDocuments",
  setup() {
    const element = reactive({
      documents: []
    });

    return { ...toRefs(element) };
  }
  // firestore: {
  //   documents: db.collection("users"),
  // },
};
</script>

<style></style>
