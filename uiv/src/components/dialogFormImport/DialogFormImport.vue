<template>
  <v-dialog v-model="props.dialog" persistent max-width="800">
    <v-card>
      <v-toolbar color="white">
        <v-toolbar-title>
          <span class="title-h5">Import Leads</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn dark icon="mdi-close" @click="close"></v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-list-subheader>File Location:</v-list-subheader>
          </v-col>

          <v-col cols="12" md="9">
            <v-file-input
              v-model="files"
              color="deep-purple-accent-4"
              placeholder="Select your file"
              append-icon="mdi-folder-open"
              prepend-icon=""
              variant="outlined"
              density="compact"
              accept=".xls,.xlsx"
              messages="Select an excel file to import the data"
              @input="clearItems"
            >
              <template v-slot:selection="{ fileNames }">
                <template
                  v-for="(fileName, index) in fileNames"
                  :key="fileName"
                >
                  {{ fileName }}
                </template>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="outlined" @click="importFile">
          Upload file
        </v-btn>
        <v-btn color="blue-darken-1" variant="outlined" @click="close">
          Close
        </v-btn>
      </v-card-actions>

      <v-row v-if="table.items.length">
        <v-col cols="12">
          <v-divider></v-divider>

          <v-card-actions>
            <v-subheader>
              Total leads in file:
              <span class="font-weight-bold">{{ table.items.length }}</span>
              Duplicates:
              <span class="font-weight-bold">{{ duplicates }}</span>
            </v-subheader>

            <v-spacer></v-spacer>

            <v-btn
              color="blue-darken-1"
              variant="outlined"
              @click="importSelected"
            >
              Import selected
            </v-btn>
            <v-btn color="blue-darken-1" variant="outlined" @click="importAll">
              Import all
            </v-btn>
            <v-btn color="blue-darken-1" variant="outlined" @click="clear">
              Clear all
            </v-btn>
          </v-card-actions>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  show-select
                  height="400"
                  density="compact"
                  v-model="selected"
                  :headers="table.headers"
                  :items="table.items"
                  item-value="Contact Name"
                  class="elevation-0"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import * as XLSX from "xlsx";
import axios from "axios";
import countries from "../countries.json";
import refs from "./refs";
import reactives from "./reactives";
import computes from "./computes";

const { files, selected } = refs();
const { table } = reactives();
const { duplicates } = computes(table);

const emits = defineEmits(["close", "refresh", "showMessage"]);
const props = defineProps({
  dialog: Boolean,
  priority: Array,
});

const close = () => {
  emits("close");
};

const importFile = () => {
  if (!files.value) {
    alert("No File Chosen");
    return;
  }

  if (files.value) {
    const file = files.value.length ? files.value[0] : null;

    const reader = new FileReader();

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      table.items = data;
    };

    reader.readAsBinaryString(file);
  }
};

var selectedItems = [];

const importRecords = () => {
  selectedItems.forEach((item) => {
    const priority = props.priority.find(
      (x) => x.name.toLowerCase() === item["Priority"].toLowerCase()
    );

    const country = countries.find(
      (x) => x.name.toLowerCase() === item["Country"].toLowerCase()
    );

    if (priority && country) {
      const data = {
        name: item["Contact Name"],
        company: item["Company Name"],
        country: country.name,
        priority: priority.id,
        email: item["Email"],
        phone_number: item["Phone Number"],
      };

      axios
        .post("/contractor/", data)
        .then((response) => {
          emits("showMessage", "Imported records");
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    }
  });

  emits("close");
};

const importAll = () => {
  selectedItems = table.items;
  importRecords();
};

const importSelected = () => {
  selectedItems = [];

  selected.value.forEach((x) => {
    const item = table.items.find(
      (i) => i["Contact Name"].toLowerCase() === x.toLowerCase()
    );
    if (item) selectedItems.push(item);
  });

  importRecords();
};

const clear = () => {
  table.items = [];
};
</script>