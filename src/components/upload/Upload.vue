<template>
  <div class="upload-container">
    <el-upload
      v-model:file-list="fileList"
      :action="uploadUrl"
      list-type="picture-card"
      :limit="maxFiles"
      :accept="acceptTypes"
      :multiple="true"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :class="{ 'hide-upload': fileList.length >= maxFiles }"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible" title="Preview" width="50%" :destroy-on-close="true">
      <img w-full :src="dialogImageUrl" alt="Preview Image" class="preview-image" />
      <template #footer>
        <el-button @click="dialogVisible = false">Đóng</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps, UploadUserFile, UploadRawFile } from 'element-plus'

  const uploadUrl = ''
  const maxFiles = 5
  const maxFileSize = 5 // MB
  const acceptTypes = 'image/jpeg,image/png,image/gif'

  const fileList = ref<UploadUserFile[]>([])
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)

  const beforeUpload = (file: UploadRawFile) => {
    const fileSize = file.size / 1024 / 1024
    const isValidType = acceptTypes.split(',').some((type) => file.type === type)

    if (!isValidType) {
      return false
    }
    if (fileSize > maxFileSize) {
      return false
    }
    return true
  }

  const handlePreview: UploadProps['onPreview'] = (file) => {
    dialogImageUrl.value = file.url as string
    dialogVisible.value = true
  }

  const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
  }

  const handleSuccess: UploadProps['onSuccess'] = (response, file) => {
    console.log(file, response)
  }

  const handleError: UploadProps['onError'] = (error, file) => {
    console.log(file, error)
  }

  const handleExceed: UploadProps['onExceed'] = () => {
    return ''
  }
</script>

<style scoped>
  .upload-container {
    max-width: 800px;
    margin: 20px auto;
  }

  .preview-image {
    max-width: 100%;
    height: auto;
  }

  .hide-upload :deep(.el-upload--picture-card) {
    display: none;
  }

  .el-upload__tip {
    color: #606266;
    font-size: 12px;
    margin-top: 8px;
  }
</style>
