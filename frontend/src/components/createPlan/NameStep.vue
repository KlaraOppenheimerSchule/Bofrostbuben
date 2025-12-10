<script setup lang="ts">
import { ref, watch } from "vue";

interface Plan {
  name: string;
}

const props = defineProps<{ plan: Plan }>();
const emit = defineEmits<{
  (e: "next", payload?: Partial<Plan>): void;
  (e: "update-plan", payload: Partial<Plan>): void;
}>();

const localName = ref(props.plan?.name ?? "");

const nameRules = [
  (v: string) => (!!v && v.length > 0) || "Name ist erforderlich",
  (v: string) => v.length <= 40 || "Max 40 Zeichen"
];

watch(localName, (val) => {
  emit("update-plan", { name: val });
});

function nextClick() {
  if (!localName.value || localName.value.length > 40) return;

  emit("next", { name: localName.value });
}
</script>

<template>
  <div>
    <v-text-field
      label="Bitte benenne deinen Plan"
      v-model="localName"
      :rules="nameRules"
      outlined
      dense
      clearable
    />
  </div>
</template>


