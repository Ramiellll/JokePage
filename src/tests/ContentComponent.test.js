import { mount } from "@vue/test-utils";
import ContentComponent from "../components/ContentComponent.vue";


const API_URL = `https://v2.jokeapi.dev/joke/Programming`;
const fetchJoke = async () => {
  const res = await (await fetch(API_URL)).json();
  return res;
}

test("mount component", async () => {
  expect(ContentComponent).toBeTruthy();

  const wrapper = mount(ContentComponent, {
    props: {
      msg: "Welcome",
    },
  });

  expect(wrapper.text()).toContain("Welcome");
});

test("API Call", async () => {
  expect(ContentComponent).toBeTruthy();
  const jsonJoke = await fetchJoke();

  expect(jsonJoke.error).toBe(false);
});
