<script lang="ts" setup>
  import { ElInput } from 'element-plus'
  import { useField } from 'vee-validate'

  interface IProps {
    name: string
    label?: string
    disabled?: boolean
    placeholder?: string
    withValidate?: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    label: '',
    disabled: false,
    placeholder: '',
  })

  const { value, errorMessage } = useField<string>(props.name, undefined, {
    validateOnValueUpdate: true,
  })
</script>
<template>
  <el-form-item :error="errorMessage" :label="label">
    <el-input
      :placeholder="label"
      v-model="value"
      v-bind="$attrs"
      :disabled="disabled"
      :validate-event="false"
    />
  </el-form-item>
</template>
