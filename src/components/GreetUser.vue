<script setup lang="ts">
import { ref } from 'vue';
import { useGreetMutation } from '@/composables/queries/demo';

const { mutateAsync } = useGreetMutation();

const greetMsg = ref('');
const name = ref('');

async function greet(): Promise<void> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg.value = await mutateAsync(name.value);
}
</script>

<template>
  <div class="card">
    <input
      id="greet-input"
      v-model="name"
      placeholder="Enter a name..."
    >
    <button
      type="button"
      @click="greet()"
    >
      Greet
    </button>
  </div>

  <p>{{ greetMsg }}</p>
</template>
