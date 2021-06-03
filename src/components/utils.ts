import {
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  computed
} from "@vue/composition-api";

export default function print(props: any) {
  const instance = getCurrentInstance();
  const state = instance?.$root.$store.state;

  const event = reactive({
    hello: ref("hello world!"),
    isLoggedIn: ref(computed(() => Object.keys(state.userProfile).length > 1)),
    isAdmin: ref(computed(() => Object.keys(state.userProfile).length > 1))
  });

  function onTest() {
    console.log(props.msg);
    console.log(event.hello);
  }

  function getScreenWidth() {
    return getCurrentInstance()?.$q.screen.width;
  }

  // function truncateTo(string = "", endLength = 25) {
  //   return string.slice(0, endLength);
  // }

  return {
    ...toRefs(event),
    onTest,
    getScreenWidth
  };
}

export function generateGradient() {
  return "#" + (1e8 ^ (Math.random() * (1 << 24))).toString(16).slice(1);
}

export function getRandomAngle(minAngle = 0, maxAngle = 360) {
  return ((Math.random() * (maxAngle - minAngle) + minAngle) / 180) * Math.PI;
}
