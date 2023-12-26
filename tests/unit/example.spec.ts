import { expect } from "chai";
import {
  mount,
  flushPromises,
  shallowMount,
  RouterLinkStub,
} from "@vue/test-utils";
import ChildrenComponent from "@/components/ChildrenComponent.vue";
import AboutView from "@/views/AboutView.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InlineMessage from "primevue/inlinemessage";
import { createRouter, createWebHistory } from "vue-router";
import App from "../../src/App.vue";
import sinon from "sinon";
import axios from "axios";
import HomeView from "@/views/HomeView.vue";
import primevue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

describe("Example.vue", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "/",
        component: HomeView,
      },
      {
        path: "/about",
        name: "About",
        component: import("@/views/AboutView.vue"),
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
    stub.withArgs("http://localhost:3000/todos").returns(
      Promise.resolve({
        status: 200,
        data: [
          {
            userId: "123",
            title: "123",
            completed: "true",
            id: 3,
          },
          {
            userId: "1",
            title: "2",
            completed: "true",
            id: 4,
          },
          {
            userId: "1",
            title: "2",
            completed: "true",
            id: 5,
          },
          {
            userId: "1",
            title: "2",
            completed: "true",
            id: 6,
          },
          {
            userId: "1",
            title: "2",
            completed: "true",
            id: 7,
          },
          {
            userId: "1",
            title: "2",
            completed: "true",
            id: 8,
          },
          {
            userId: "123",
            title: "123",
            completed: "true",
            id: 9,
          },
        ],
      })
    );
    const wrapper = shallowMount(HomeView, {
      global: {
        components: {
          Toast,
          DataTable,
          Column,
          InputText,
          Dialog,
          Button,
          InlineMessage,
        },
        plugins: [primevue, ToastService],
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(stub.withArgs("http://localhost:3000/todos").calledOnce).to.equal(
      true
    );
    stub.restore();
    wrapper.unmount();
  });

  it("5. Test  post method", async () => {
    const stub = sinon.stub(axios, "post");
    const data = {
      userId: "6",
      title: "123123",
      completed: "true",
    };
    const data2 = [
      {
        userId: "123",
        title: "123",
        completed: "true",
        id: 3,
      },
      {
        userId: "1",
        title: "2",
        completed: "true",
        id: 4,
      },
      {
        userId: "1",
        title: "2",
        completed: "true",
        id: 5,
      },
      {
        userId: "1",
        title: "2",
        completed: "true",
        id: 6,
      },
      {
        userId: "1",
        title: "2",
        completed: "true",
        id: 7,
      },
      {
        userId: "1",
        title: "2",
        completed: "true",
        id: 8,
      },
      {
        userId: "123",
        title: "123",
        completed: "true",
        id: 9,
      },
      {
        userId: "6",
        title: "123123",
        completed: "true",
      },
    ];
    await stub
      .withArgs("https://jsonplaceholder.typicode.com/todos", data)
      .returns(
        Promise.resolve({
          status: 200,
          data2,
        })
      );
    const wrapper = shallowMount(HomeView, {
      global: {
        components: {
          Toast,
          DataTable,
          Column,
          InputText,
          Dialog,
          Button,
          InlineMessage,
        },
        plugins: [primevue, ToastService],
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(
      stub.withArgs("http://localhost:3000/todos", data).calledOnce
    ).to.equal(true);
    stub.restore();
    wrapper.unmount();
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
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router, primevue, ToastService],
        config: {
          errorHandler: (err) => {
            console.log(err);
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    const routeStub = sinon.stub(router, "push");
    await router.replace({
      name: "About",
    });
    await router.isReady();
    await flushPromises();
    await wrapper.vm.$nextTick();
    await wrapper.find(".nav-bar").findAll("a")[1].trigger("click");
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(AboutView).exists()).to.equal(true);
    sinon.restore();
    routeStub.restore();
    wrapper.unmount();
  });
});
