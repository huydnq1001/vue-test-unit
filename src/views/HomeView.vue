<template>
  <div class="card p-fluid mt-8">
    <DataTable
      v-model:editingRows="editingRows"
      :value="products"
      editMode="row"
      dataKey="id"
      lazy
      :loading="loading"
      @row-edit-save="onRowEditSave"
    >
      <Column field="userId" header="User ID" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText
            :id="field"
            placeholder="Please enter User ID"
            :class="{ 'p-invalid': errors[field] }"
            v-model="data[field]"
            @change="onChange(data, field)"
          />
          <InlineMessage class="mt-2" v-if="errors[field]" severity="error">{{
            errors[field]
          }}</InlineMessage>
        </template>
      </Column>
      <Column field="title" header="Title" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText
            :id="field"
            placeholder="Please enter Title"
            :class="{ 'p-invalid': errors[field] }"
            v-model="data[field]"
            @change="onChange(data, field)"
          />
          <InlineMessage class="mt-2" v-if="errors[field]" severity="error">{{
            errors[field]
          }}</InlineMessage>
        </template>
      </Column>
      <Column field="completed" header="Completed" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText
            :id="field"
            :class="{ 'p-invalid': errors[field] }"
            placeholder="Please enter Completed"
            v-model="data[field]"
            @change="onChange(data, field)"
          />
          <InlineMessage class="mt-2" v-if="errors[field]" severity="error">{{
            errors[field]
          }}</InlineMessage>
        </template>
      </Column>
      <Column style="width: 20%" field="id" header="action">
        <template #body="{ data, field }">
          <button
            class="pi pi-delete-left btn-delete"
            @click="handleConfirm(data[field])"
          ></button>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        header="action"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
    <Button
      id="btn-add"
      class="mt-4 mb-4"
      icon="pi pi-plus"
      @click="openModalCreate"
    />
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <h4>Add Todo</h4>
    </template>
    <form id="app" @submit="checkForm">
      <div class="field">
        <label for="userId" class="p-sr-only">Username</label>
        <InputText
          placeholder="User ID"
          class="w-full"
          name="name"
          v-model="todoData.userId"
          @change="onChange(todoData, 'userId')"
        />
        <InlineMessage
          v-if="errors.userId"
          severity="error"
          class="mt-2 text-left w-full justify-content-start"
          >{{ errors.userId }}</InlineMessage
        >
      </div>
      <div class="field">
        <label for="Title" class="p-sr-only">Username</label>
        <InputText
          placeholder="Title"
          class="w-full"
          name="title"
          @change="onChange(todoData, 'title')"
          v-model="todoData.title"
        />
        <InlineMessage
          v-if="errors.title"
          severity="error"
          class="mt-2 text-left w-full justify-content-start"
          >{{ errors.title }}</InlineMessage
        >
      </div>
      <div class="field">
        <label for="Completed" class="p-sr-only">Completed</label>
        <InputText
          placeholder="Completed"
          class="w-full"
          name="Completed"
          @change="onChange(todoData, 'completed')"
          v-model="todoData.completed"
        />
        <InlineMessage
          v-if="errors.completed"
          severity="error"
          class="mt-2 text-left w-full justify-content-start"
          >{{ errors.completed }}</InlineMessage
        >
      </div>
    </form>
    <template #footer>
      <Button
        type="submit"
        label="Ok"
        icon="pi pi-check"
        @click="createTodo(todoData)"
      />
    </template>
  </Dialog>
  <Dialog
    class="dialog-delete"
    v-model:visible="confirmDeleted"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <h4>Deleted Todo</h4>
    </template>
    <p class="red-500 danger" severity="danger">
      Are you sure you want to delete this todo?
    </p>
    <template #footer>
      <Button
        type="submit"
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        @click="confirmDeleted = false"
      />
      <Button
        class="deleteTodo"
        type="submit"
        label="Ok"
        icon="pi pi-check"
        @click="deleteTodo"
        severity="danger"
      />
    </template>
  </Dialog>
  <Toast class="toast" />
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import axios from "axios";
import Toast from "primevue/toast";
import InlineMessage from "primevue/inlinemessage";
import { ref, onMounted, reactive, defineComponent } from "vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "HomeView",
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Dialog,
    Toast,
    InlineMessage,
  },
  setup() {
    const toast = useToast();
    let todoId = ref(null);
    let confirmDeleted = ref(false);
    let todoData = reactive({
      userId: null,
      title: null,
      completed: null,
    });
    let loading = ref(false);
    let visible = ref(false);
    let userId = ref(null);
    let title = ref(null);
    let products = ref([]);
    let editingRows = ref([]);
    let errors = reactive({});

    const onRowEditSave = async (event) => {
      let { newData, index } = event;
      const id = newData.id;
      loading.value = true;
      await axios
        .patch(`http://localhost:3000/todos/${id}`, newData)
        .then((response) => {
          showSuccess("Update success");
          loading.value = false;
          products.value[index] = response.data;
        })
        .catch((e) => {
          showError(e);
        })
        .finally(() => (loading.value = false));
    };
    const openModalCreate = () => {
      visible.value = true;
    };
    const clearForm = () => {
      todoData = {
        userId: null,
        title: null,
        completed: null,
      };
    };

    const showSuccess = (content) => {
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: content,
        life: 30000,
      });
    };
    const showError = (content) => {
      toast.add({
        severity: "error",
        summary: "Error Message",
        detail: content,
        life: 3000,
      });
    };

    const fetchData = async () => {
      loading.value = true;
      await axios
        .get(`http://localhost:3000/todos`)
        .then((response) => {
          products.value = response.data;
        })
        .catch((e) => {
          showError(e);
        })
        .finally(() => (loading.value = false));
    };

    const createTodo = async (todoData) => {
      const arrayKey = Object.keys(todoData);
      arrayKey.forEach((element) => {
        if (!todoData[element]) {
          errors[element] = element + " is required.";
        }
      });
      const isError = Object.keys(errors).every((key) => !errors[key]);
      if (isError) {
        loading.value = true;
        await axios
          .post(`http://localhost:3000/todos`, todoData)
          .then((response) => {
            showSuccess("Create success");
            products.value.push(response.data);
          })
          .catch((e) => {
            showError(e);
          })
          .finally(() => {
            clearForm();
            loading.value = false;
            visible.value = false;
          });
      }
    };

    const onChange = (data, field) => {
      errors[field] = "";
      if (field === "completed") {
        const isValue = data[field] == "true" || data[field] == "false";
        errors[field] = isValue
          ? ""
          : field + " is includes boolean 'true' / 'false'";
      }
      if (data[field] === "") {
        errors[field] = field + " is required.";
      }
    };

    const deleteTodo = async () => {
      loading.value = true;
      await axios
        .delete(`http://localhost:3000/todos/${todoId.value}`)
        .then((response) => {
          if (response.status === 200) {
            showSuccess("Delete success");
            products.value = products.value.filter(
              (item) => item.id !== todoId.value
            );
          }
        })
        .catch((e) => {
          showError(e);
        })
        .finally(() => {
          loading.value = false;
          confirmDeleted.value = false;
        });
    };

    const handleConfirm = (id) => {
      todoId.value = id;
      confirmDeleted.value = true;
    };

    onMounted(() => {
      fetchData();
    });

    return {
      handleConfirm,
      todoId,
      confirmDeleted,
      todoData,
      loading,
      visible,
      userId,
      title,
      products,
      editingRows,
      errors,
      clearForm,
      onRowEditSave,
      createTodo,
      onChange,
      deleteTodo,
      openModalCreate,
    };
  },
});
</script>
<style scoped></style>
