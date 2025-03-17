<script setup lang="ts" generic="T">
  import { onMounted, ref, watch, nextTick } from 'vue'
  import { ElTable, ElTableColumn } from 'element-plus'
  import type { IColumnConfig } from '@/types'
  import Sortable from 'sortablejs'

  interface IProps {
    data?: T[]
    columns?: IColumnConfig<T>[]
    border?: boolean
    selectable?: boolean
    draggable?: boolean
    hasActions?: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    data: () => [],
    columns: () => [],
    border: true,
    selectable: true,
    draggable: true,
    hasActions: true,
  })

  const sortData = ref<T[]>([...props.data])
  const tableRef = ref<InstanceType<typeof ElTable> | null>(null)

  watch(
    () => props.data,
    (newVal) => {
      sortData.value = [...newVal]
    },
    { deep: true, immediate: true },
  )

  const handleUpdateData = (data: T[]) => {
    sortData.value = data
    emits('update:data', data)
  }

  const emits = defineEmits<{
    (e: 'selectionChange', value: string[]): void
    (e: 'update:data', value: T[]): void
  }>()

  const handleSelectionChange = (value: string[]) => {
    if (!props.selectable) return
    emits('selectionChange', value)
  }

  onMounted(() => {
    if (!props.draggable || !tableRef.value) return

    nextTick(() => {
      const tableBody = tableRef.value?.$el?.querySelector('.el-table__body tbody')
      if (tableBody) {
        Sortable.create(tableBody, {
          handle: '.drag-handle',
          animation: 150,
          onEnd: async (evt) => {
            const oldIndex = evt.oldIndex ?? -1
            const newIndex = evt.newIndex ?? -1

            if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
              const newData = [...sortData.value] as T[]
              const [movedItem] = newData.splice(oldIndex, 1)
              newData.splice(newIndex, 0, movedItem)
              sortData.value = []
              await nextTick()
              sortData.value = [...newData]
              handleUpdateData(newData)
            }
          },
        })
      }
    })
  })
</script>

<template>
  <el-table
    ref="tableRef"
    :data="sortData"
    :border="border"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="selectable" type="selection" width="55" />

    <el-table-column
      v-for="(column, index) in columns"
      :key="`${column.prop}-${index}`"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
    >
      <template #default="{ row }">
        <template v-if="column.content">
          <component :is="column.content(row)" />
        </template>
        <template v-else>
          {{ row[column.prop] }}
        </template>
      </template>
    </el-table-column>

    <el-table-column v-if="draggable" width="50">
      <template #default>
        <span class="drag-handle" style="cursor: grab">☰</span>
      </template>
    </el-table-column>
  </el-table>
</template>
