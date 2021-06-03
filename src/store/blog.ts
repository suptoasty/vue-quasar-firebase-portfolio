import * as fb from "@/plugins/firebase";
import router from "@/router/index";
import Vue from "vue";
import Vuex from "vuex";

import * as store from "@/store/index";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async createPost({ state, commit }, post) {
      console.log(store.default);
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser?.uid,
        userName: store.default.state.userProfile.name,
        comments: 0,
        likes: 0
      });
    }
  },
  modules: {}
});
