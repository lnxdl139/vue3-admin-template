<script lang="ts" setup>
  import { ElCheckbox, ElFormItem } from 'element-plus'
  import { useField } from 'vee-validate'

  interface IProps {
    name: string
    label: string
    disabled?: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
  })

  const { value, errorMessage } = useField(props.name, undefined, {
    type: 'checkbox',
    valueProp: true,
    uncheckedValue: false,
  })
</script>
<template>
  <el-form-item :error="errorMessage">
    <el-checkbox v-model="value">
      {{ label }}
    </el-checkbox>
  </el-form-item>
</template>
