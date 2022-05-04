<template>
  <div :class="{ 'm-choose-icon-dialog-body-height': isScroll }">
    <el-dialog destroy-on-close v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <gull-form
          ref="form"
          :options="options"
          label-width="150px"
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </gull-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { FormOptions } from '@/components/gullForm/types/types'
import GullForm from '@/components/gullForm/GullForm.vue'
let props = defineProps({
  // 是否只在可视区域内滚动
  isScroll: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  }
})
let emits = defineEmits(['update:visible'])

// 表单实例
let form = ref()

// 弹出框的显示与隐藏
let dialogVisible = ref<boolean>(props.visible)

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)
watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)

// 分发方法
defineExpose({
  form
})
</script>

<style lang="less" scoped></style>
