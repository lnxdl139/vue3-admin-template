<script setup lang="ts">
  import { ElButton, type ButtonType } from 'element-plus'
  import { computed, type Component, type PropType } from 'vue'
  import type { ComponentSize } from 'element-plus'

  const props = defineProps({
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined,
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingIcon: {
      type: [String, Object] as PropType<string | Component>,
      default: undefined,
    },
    icon: {
      type: [String, Object] as PropType<string | Component>,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    nativeType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    autoInsertSpace: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    darker: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: [String, Object] as PropType<string | Component>,
      default: 'button',
    },
  })

  const color = computed(() => {
    const { type, link } = props
    if (type === 'primary' && !link) {
      return
    }
    return ''
  })

  const style = computed(() => {
    const { type, link } = props
    if (type === 'primary' && !link) {
      return '--el-button-text-color: #fff; --el-button-hover-text-color: #fff'
    }
    return ''
  })
</script>

<template>
  <ElButton v-bind="{ ...props }" :color="color" :style="style">
    <slot></slot>
    <slot name="icon"></slot>
    <slot name="loading"></slot>
  </ElButton>
</template>
