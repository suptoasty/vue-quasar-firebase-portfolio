import * as fb from "@/plugins/firebase";
import router from "@/router/index";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {
      name: ""
    }
  },
  mutations: {
    setUserProfile(state: any, val: any) {
      state.userProfile = val;
    }
  },
  actions: {
    async login({ dispatch }: any, form: any) {
      if (form.credential) {
        const user = await fb.auth
          .signInWithCredential(form.credential)
          .then((response: any) => {
            return response.user;
          });

        dispatch("fetchUserProfile", user);
        return;
      }

      const user = await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then((response: any) => {
          return response.user;
        });

      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }: any, user: any) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      commit("setUserProfile", userProfile.data());

      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async register({ dispatch }: any, form: any) {
      const { user }: any = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      await fb.usersCollection.doc(user.uid).set({
        name: "test",
        title: "admin"
      });

      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }: any) {
      await fb.auth.signOut();

      commit("setUserProfile", {});
      // router.push("/login");
    }
  },
  modules: {}
});
