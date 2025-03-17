<script lang="ts" setup generic="T extends string | number">
  import { ElCheckbox, ElFormItem, ElCheckboxGroup } from 'element-plus'
  import { useField } from 'vee-validate'
  import type { IOption } from '@/types'

  interface IProps {
    name: string
    label: string
    options: IOption<T>[]
    disabled?: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
  })

  const { value, errorMessage } = useField<T[]>(props.name)
</script>
<template>
  <el-form-item :error="errorMessage">
    <el-checkbox-group v-model="value">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-checkbox-group>
  </el-form-item>
</template>
