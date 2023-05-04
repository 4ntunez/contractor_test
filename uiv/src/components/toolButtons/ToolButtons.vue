<template>
  <v-card>
    <v-app-bar elevation="1">
      <v-spacer></v-spacer>

      <v-slide-group show-arrows justify-center align-center>
        <v-slide-group-item>
          <v-btn variant="underlined" @click.stop="refresh">refresh</v-btn>
        </v-slide-group-item>

        <v-slide-group-item>
          <v-btn variant="underlined" @click="addRecord">Add New</v-btn>
        </v-slide-group-item>

        <v-slide-group-item>
          <v-btn variant="underlined" @click="updateRecord">Update</v-btn>
        </v-slide-group-item>

        <v-slide-group-item>
          <v-btn variant="underlined" @click="deleteRecord">Delete</v-btn>
        </v-slide-group-item>

        <v-slide-group-item>
          <v-btn variant="underlined" @click="dialogImport = true"
            >Import</v-btn
          >
        </v-slide-group-item>

        <!-- <v-slide-group-item>
          <v-select
            variant="filled"
            hide-details
            density="compact"
            :items="options.items"
            v-model="options.model"
            @click="exportTo"
          ></v-select>
        </v-slide-group-item> -->

        <v-slide-group-item>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                {{ options.model }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="item in options.items" :key="item">
                <v-list-item-title @click="exportTo(item)">{{
                  item
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-slide-group-item>
      </v-slide-group>

      <v-spacer></v-spacer>
    </v-app-bar>

    <dialog-form
      :state="dialog.state"
      :title="dialog.title"
      :action="dialog.action"
      :button="dialog.button"
      :selected="props.selected"
      :items="props.items"
      @close="closeDialogForm"
      @reset="resetDialogForm"
      @refresh="refreshDashboard"
    ></dialog-form>

    <dialog-form-import
      :dialog="dialogImport"
      :priority="props.priority"
      @close="closeDialogImport"
      @refresh="refreshDashboard"
    ></dialog-form-import>

    <v-snackbar v-model="snackbar">
      New record added
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps, onMounted } from "vue";
import axios from "axios";
import DialogForm from "../dialogForm/DialogForm.vue";
import DialogFormImport from "../dialogFormImport/DialogFormImport.vue";
import refs from "./refs";
import reactives from "./reactives";

import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

const { snackbar, dialogImport, options } = refs;
const { dialog, initialDialog } = reactives;

const props = defineProps({
  selected: Array,
  items: Array,
  priority: Array,
});

// Emit definitions
const emits = defineEmits(["loadData", "deleteRecord"]);

// Methods
const refresh = () => {
  // Refresh records
  emits("loadData");
};

const addRecord = () => {
  // Add record
  dialog.state = true;
  dialog.title = "Add New";
  dialog.action = "add";
  dialog.button = "Add";
};

const updateRecord = () => {
  // Update record
  if (!props.selected.length) {
    alert("You have not record selected!");
    return;
  }

  dialog.state = true;
  dialog.title = "Update Record";
  dialog.action = "update";
  dialog.button = "Update";
};

const deleteRecord = () => {
  emits("deleteRecord");
};

const closeDialogForm = () => {
  // Close dialog form insert, edit
  for (const [key, value] of Object.entries(initialDialog)) {
    dialog[key] = value;
  }
};

const closeDialogImport = () => {
  // Close dialog form import
  dialogImport.value = false;
};

const refreshDashboard = () => {
  // Refresh dashboard data table
  emits("loadData");
};

const startPDF = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  let body = [
    ["name", "Company Name", "Country", "Priority", "Email", "Phone Number"],
  ];

  props.items.forEach((x) => {
    body.push([
      x.name,
      x.company,
      x.country,
      x.priority,
      x.email,
      x.phone_number,
    ]);
  });

  const document = {
    content: [
      {
        text: "CONTRACTOR REPORT",
      },
      {
        table: {
          body: body,
        },
      },
    ],
  };

  pdfMake.createPdf(document).download();
};

const startPrint = () => {};

const exportTo = (v) => {
  if (v === "Export-PDF") startPDF();
  if (v === "Print") startPrint();
};
</script>