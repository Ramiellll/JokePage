import { mount } from "@vue/test-utils";
import HeaderComponent from "../components/HeaderComponent.vue";

test("mount component", async () => {
  expect(HeaderComponent).toBeTruthy();

  const wrapper = mount(HeaderComponent, {
    props: {
      msg: "JokePage",
    },
  });

  expect(wrapper.text()).toContain("JokePage");
});