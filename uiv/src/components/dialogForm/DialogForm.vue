<template>
  <v-dialog v-model="props.state" persistent max-width="600">
    <v-form id="form" @submit.stop.prevent="onSubmit()">
      <v-card dense>
        <v-toolbar color="white">
          <v-toolbar-title>
            <span class="title-h5">{{ props.title }}</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn dark icon="mdi-close" @click="close"></v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-text-field
              required
              dense
              label="Name"
              variant="outlined"
              density="compact"
              v-model="state.name"
              @change="v$.name.$touch()"
              @blur="v$.name.$touch()"
              :error-messages="v$.name.$errors.map((e) => e.$message)"
            ></v-text-field>

            <v-text-field
              required
              dense
              label="Company Name"
              variant="outlined"
              density="compact"
              v-model="state.company"
              @change="v$.company.$touch()"
              @blur="v$.company.$touch()"
              :error-messages="v$.company.$errors.map((e) => e.$message)"
            ></v-text-field>

            <v-select
              required
              dense
              label="Country Name"
              variant="outlined"
              density="compact"
              :items="countries"
              item-title="name"
              item-value="name"
              v-model="state.country"
              @input="v$.country.$touch()"
              @blur="v$.country.$touch()"
              :error-messages="v$.country.$errors.map((e) => e.$message)"
            ></v-select>

            <v-select
              required
              dense
              label="Priority"
              variant="outlined"
              density="compact"
              :items="priority"
              item-title="name"
              item-value="id"
              v-model="state.priority"
              @input="v$.priority.$touch()"
              @blur="v$.priority.$touch()"
              :error-messages="v$.priority.$errors.map((e) => e.$message)"
            ></v-select>

            <v-text-field
              required
              dense
              label="Email"
              variant="outlined"
              density="compact"
              v-model="state.email"
              @change="v$.email.$touch()"
              @blur="v$.email.$touch()"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
            ></v-text-field>

            <vue-tel-input
              v-model="state.phone_number"
              @input="onPhoneInput"
            ></vue-tel-input>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="underlined" @click="reset">
            Reset
          </v-btn>
          <v-btn color="blue-darken-1" variant="underlined" @click="close">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="underlined" type="submit">
            {{ props.button }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, numeric } from "@vuelidate/validators";
import axios from "axios";
import countries from "../countries.json";
import refs from "./refs";
import reactives from "./reactives";

const { country, priority, phone_number } = refs;
const { initialState, state } = reactives;

// Props definitions
const props = defineProps({
  state: Boolean,
  title: String,
  action: String,
  button: String,
  selected: Array,
  items: Array,
});

const rules = {
  name: { required },
  company: { required },
  country: { required },
  priority: { required },
  email: { required, email },
  phone_number: { required, numeric },
};

const v$ = useVuelidate(rules, state);

// Emit definitions
const emits = defineEmits(["close", "reset", "refresh"]);

// watches
watchEffect(() => {
  const item = props.items.find((x) => x.id == props.selected[0]);

  if (item) {
    state.name = item.name;
    state.company = item.company;
    state.country = item.country;
    state.priority = item.priority;
    state.email = item.email;
    state.phone_number = item.phone_number;
  }
});

// Methods definitions
onMounted(() => {
  loadPriority();
});

const loadPriority = async () => {
  // Load priorities
  await axios
    .get("/priority")
    .then((response) => {
      priority.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const onSubmit = async () => {
  // Insert or edit record
  let method = "POST";
  let url = "/contractor/";

  if (props.action === "update") {
    method = "PUT";
    url = `/contractor/${props.selected[0]}/`;
  }

  await axios({
    method,
    url,
    data: state,
  })
    .then((response) => {
      emits("refresh");
      reset();
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    })
    .finally(() => {
      if (props.action === "update") emits("close");
    });
};

const reset = () => {
  // Reset form
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
};

const close = () => {
  // Close form
  reset();
  emits("close");
};

const onPhoneInput = (phone, phoneObject, input) => {
  if (phoneObject?.formatted) {
    state.phone_number = phoneObject.formatted;
  }
};
</script>

<style>
</style>