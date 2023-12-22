import { expect } from "chai";
import { mount, flushPromises } from "@vue/test-utils";
import ChildrenComponent from "@/components/ChildrenComponent.vue";
import AboutView from "@/views/AboutView.vue";

import { createRouter, createWebHistory } from "vue-router";
import App from "../../src/App.vue";
import HeaderMenuVue from "@/components/HeaderMenu.vue";
import sinon from "sinon";
import axios from "axios";

describe("Example.vue", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "/",
        component: import("@/views/HomeView.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: AboutView,
      },
    ],
  });

  it("1. Test props before Click", async () => {
    const msg = "Hello World";
    const wrapper = mount(AboutView);
    expect(wrapper.findComponent(ChildrenComponent).props("msg")).to.equal(msg);
    await wrapper.find("button").trigger("click");
    wrapper.unmount();
  });

  it("2. Test props after Click", async () => {
    const msg = "This is an about page";
    const wrapper = mount(AboutView);
    await wrapper.findAll("button")[1].trigger("click");
    expect(wrapper.findComponent(ChildrenComponent).props("msg")).to.equal(msg);
    wrapper.unmount();
  });

  it("3. Test AboutView text", () => {
    const msg = "About Page";
    const wrapper = mount(AboutView);
    expect(wrapper.find("h1").text()).to.equal(msg);
    wrapper.unmount();
  });

  it("4. Test get method", async () => {
    const stub = sinon.stub(axios, "get");
    await stub.withArgs("https://jsonplaceholder.typicode.com/todos").returns(
      Promise.resolve({
        status: 200,
        data: ["a", "b", "c"],
      })
    );
  });

  it("5. Test  post method", async () => {
    const stub = sinon.stub(axios, "post");
    const data = {
      userId: "6",
      title: "123123",
      completed: "true",
    };
    await stub
      .withArgs("https://jsonplaceholder.typicode.com/todos", data)
      .rejects(
        Promise.resolve({
          status: 200,
          data,
        })
      );
  });

  it("6. Test  Emitted in children", async () => {
    const wrapper = mount(AboutView);
    const childrenCpm = wrapper.findComponent(ChildrenComponent);
    await childrenCpm.find("button").trigger("click");

    expect(childrenCpm.emitted("changeMessage")).lengthOf(1);
    wrapper.unmount();
  });

  it("7. Test  Emitted in parent", async () => {
    const msg = "Value emitted";
    const wrapper = mount(AboutView);
    const childrenCpm = wrapper.findComponent(ChildrenComponent);
    await childrenCpm.find("button").trigger("click");

    expect(wrapper.findComponent(ChildrenComponent).props("msg")).to.equal(msg);
    wrapper.unmount();
  });

  it("8. Test routing", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();
    await wrapper
      .findComponent(HeaderMenuVue)
      .find(".nav-bar")
      .findAll("a")[1]
      .trigger("click");
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(AboutView).exists()).to.equal(true);
    wrapper.unmount();
  });
});
