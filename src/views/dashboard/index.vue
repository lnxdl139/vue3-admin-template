<script setup lang="ts">
  import type { IColumnConfig } from '@/types'
  import { h, ref } from 'vue'

  interface IProduct {
    id: number
    name: string
    price: number
  }

  const data = ref([
    { id: 1, name: 'Sản phẩm A', price: 1000 },
    { id: 2, name: 'Sản phẩm B', price: 1500 },
    { id: 3, name: 'Sản phẩm C', price: 1600 },
    { id: 4, name: 'Sản phẩm D', price: 1700 },
    { id: 5, name: 'Sản phẩm E', price: 1800 },
    { id: 9, name: 'Sản phẩm F', price: 1900 },
    { id: 7, name: 'Sản phẩm G', price: 2000 },
    { id: 8, name: 'Sản phẩm H', price: 2100 },
    { id: 6, name: 'Sản phẩm I', price: 2200 },
    { id: 10, name: 'Sản phẩm J', price: 2300 },
    { id: 11, name: 'Sản phẩm K', price: 2400 },
    { id: 12, name: 'Sản phẩm L', price: 2500 },
  ])

  const columns = [
    { label: 'ID', prop: 'id', sortable: true },
    { label: 'Tên sản phẩm', prop: 'name' },
    { label: 'Giá', prop: 'price', sortable: true },
    {
      label: 'Tùy chỉnh',
      prop: 'custom',
      content: (row: IProduct) => h('span', { style: 'color: red' }, `Giá: ${row.price}`),
    },
  ] as IColumnConfig<IProduct>[]
</script>

<template>
  <BaseTable :columns="columns" :data="data" :draggable="true" />
</template>
