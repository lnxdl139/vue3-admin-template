import { ElNotification, type NotificationParamsTyped } from 'element-plus'
import { isVNode } from 'vue'

const defaultConfig: NotificationParamsTyped = {
  duration: 3000,
  showClose: true,
  position: 'top-right',
}

const handleConfig = (options: NotificationParamsTyped) => {
  if (typeof options === 'string' || isVNode(options)) {
    return {
      message: options,
      ...defaultConfig,
    }
  }

  if (options && typeof options === 'object') {
    return {
      ...defaultConfig,
      ...options,
    }
  }
}

export const toastSuccess = (options: NotificationParamsTyped) => {
  const config = handleConfig(options)
  ElNotification.success(config)
}

export const toastError = (options: NotificationParamsTyped) => {
  const config = handleConfig(options)
  ElNotification.error(config)
}
