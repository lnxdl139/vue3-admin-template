<script lang="ts" setup>
  import { ElForm, ElRow, ElCol } from 'element-plus'
  import { useForm, type GenericObject } from 'vee-validate'
  import { computed, useSlots, type Slots } from 'vue'
  import { toTypedSchema } from '@vee-validate/zod'
  import type { PartialDeep } from 'type-fest'
  import type { ZodType, ZodTypeDef } from 'zod'

  interface IProps {
    disabled?: boolean
    initialValues: PartialDeep<GenericObject, object>
    schema: ZodType<anyType, ZodTypeDef, anyType>
    submitText?: string
    cancelText?: string
    labelPosition?: 'top' | 'right'
  }

  const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    submitText: 'Submit',
    cancelText: 'Cancel',
    labelPosition: 'top',
  })

  const methods = useForm({
    initialValues: props.initialValues,
    validationSchema: toTypedSchema(props.schema),
  })

  const slots = useSlots() as Slots
  const hasAction = computed(() => !!slots.action)

  const emits = defineEmits<{
    (e: 'submit', values: anyType): void
  }>()

  const onSubmit = methods.handleSubmit(async (values) => {
    emits('submit', values)
  })

  defineExpose({ ...methods, onSubmit })
  
</script>
<template>
  <el-form v-bind="$attrs" :label-position="labelPosition">
    <slot></slot>

    <slot name="action" v-if="hasAction" :submit="onSubmit"></slot>
    <el-row :gutter="20" v-else>
      <el-col :span="12" :offset="6">
        <base-button :disabled="disabled">Cancel</base-button>
        <base-button :disabled="disabled" @click="onSubmit">Submit</base-button>
      </el-col>
    </el-row>
  </el-form>
</template>
