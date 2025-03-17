<script lang="ts" setup>
  import { ref, watch } from 'vue';

  const title = ref<string>('')

  watch(title, (newVal, oldVal) => {
    console.log('title changed', newVal, oldVal)
  })

</script>
<template>
  <div>
    <BaseInput name="title" v-model="title" :with-validate="false"></BaseInput>
  </div>
</template>
