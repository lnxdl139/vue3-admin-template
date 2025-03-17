<script lang="ts" setup generic="T extends PropertyKey">
  import { ElRadio, ElFormItem, ElRadioGroup } from 'element-plus'
  import { useField } from 'vee-validate'
  import type { IOption } from '@/types'

  interface IProps {
    name: string
    label: string
    disabled?: boolean
    options: IOption<T>[]
  }

  const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
  })

  const { value, errorMessage } = useField(props.name, undefined, {
    type: 'radio',
    valueProp: true,
    uncheckedValue: false,
  })
</script>
<template>
  <el-form-item :error="errorMessage">
    <el-radio-group v-model="value">
      <el-radio v-for="item in options" :key="item.value">
        {{ label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
