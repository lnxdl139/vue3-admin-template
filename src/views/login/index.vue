<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
  import { ref } from 'vue'
  import { z } from 'zod'
  import { BaseInput } from '@/components/input'
  import { initializeUserRoutes } from '@/utils/auth'
  import BaseForm from '@/components/form/BaseForm.vue'
  import BaseButton from '@/components/button/BaseButton.vue'
  import useToken from '@/composables/useToken'
  import router from '@/router'
  import type { ILoginPayload } from '@/types'
  import authApi from '@/api/auth.api'
  import { DASHBOARD_PATH } from '@/router/constant'
  import { toastError, toastSuccess } from '@/utils/toast'
  // import { ElNotification } from 'element-plus'

  const formRef = ref()
  const initialValues = { username: '', password: '' }
  const schema = z.object({
    username: z.string().min(1, { message: 'Must be 5 or more characters long' }),
    password: z.string().min(1, { message: 'Must be 5 or fewer characters long' }),
  })

  const handleSubmit = async (values: ILoginPayload) => {
    try {
      const { data = { token: 'token', expired: 200000000 } } = await authApi.login(values)
      useToken().setToken(data.token, data.expired)
      await initializeUserRoutes()
      toastSuccess({ message: 'Login success' })
      router.push({ path: DASHBOARD_PATH })
    } catch (error) {
      console.log(error)
      toastError({ message: 'Login failed' })
    }
  }
</script>

<template>
  <div>
    <BaseForm ref="formRef" :initialValues="initialValues" :schema="schema" @submit="handleSubmit">
      <BaseInput label="username" name="username"></BaseInput>
      <BaseInput label="password" name="password"></BaseInput>
      <template #action>
        <div>
          <BaseButton @click="formRef?.onSubmit" type="primary" style="width: 100%"
            >Submit</BaseButton
          >
        </div>
      </template>
    </BaseForm>
  </div>
</template>
<style lang="scss" scoped>
  .el-form {
    max-width: 600px;
    margin: 40px auto;
    padding: 40px;
    background: #ffffff;
    border-radius: 10px;
  }
</style>
