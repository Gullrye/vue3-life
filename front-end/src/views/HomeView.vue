<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormOptions } from '@/components/gullForm/types/types'
import GullModalForm from '@/components/modalForm/ModalForm.vue'
import GullProgress from '@/components/gullProgress/GullProgress.vue'
import useLife from '@/hooks/useLife'
import { onMounted, ref, watch } from 'vue'
import deepClone from 'lodash/cloneDeep'

const {
  lifeData,
  lifeDetail,
  visible,
  getLifeList,
  addLife,
  editLife,
  delLife,
  open
} = useLife

let optionsOrigin: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input-number',
    value: 1,
    prop: 'lifeEnd',
    label: '你打算活到多少岁？',
    attrs: {
      min: 1,
      max: 200
    }
  },
  {
    type: 'switch',
    value: 1,
    prop: 'lightOrDark',
    label: '黑夜与光明？',
    attrs: {
      activeColor: '#fad01b',
      inactiveColor: '#000',
      activeValue: 1,
      inactiveValue: 0,
      disabled: false
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择',
    prop: 'firstDay',
    label: '第一天是周几？',
    attrs: {
      style: {
        width: '100%'
      }
    },
    rules: [
      {
        required: true,
        message: '请选择周几',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '周一',
        value: 1
      },
      {
        type: 'option',
        label: '周日',
        value: 0
      }
    ]
  },
  {
    type: 'switch',
    value: true,
    prop: 'beWorry',
    label: '来点儿紧迫感？'
  }
]
let options = ref<FormOptions[]>(deepClone(optionsOrigin))

let confirm = (form: any) => {
  let validate = form.validate()
  validate((valid: boolean) => {
    if (valid) {
      let data = form.getFormData()
      if (lifeDetail.value!._id) {
        editLife(lifeDetail.value!._id, data)
      } else {
        addLife(data)
      }
    } else {
      ElMessage.error('表单填写有误,请检查')
    }
  })
}
let cancel = (form: any) => {
  visible.value = false
}
let handleDelete = (id: string) => {
  delLife(id)
}

getLifeList()
watch(
  lifeDetail,
  () => {
    if (lifeDetail.value && lifeDetail.value._id) {
      options.value.forEach((item: FormOptions) => {
        item.value =
          lifeDetail.value![item.prop as keyof typeof lifeDetail.value]
      })
    } else {
      options.value = optionsOrigin
    }
  },
  { deep: true }
)

</script>

<template>
  <div class="life-container">
    <div class="btn-action">
      <template v-for="item in lifeData" :key="item._id">
        <el-tag
          @click="open($event, item._id)"
          @close="handleDelete(item._id)"
          style="margin: 5px"
          effect="dark"
          color="#a650fe"
          closable
          >{{ item.username }}</el-tag
        >
      </template>
      <el-button type="danger" @click="open">Add</el-button>
    </div>
    <div class="title">"锦瑟无端五十弦"</div>
    <p class="author">Zz <strong>·</strong> {{ lifeDetail?.username || '暂无' }}</p>
    <div class="summary-box">
      <p>你的<strong>人生</strong>还剩下<strong>36</strong>年</p>
      <gull-progress
        :bar-width="'80%'"
        :bar-bg-color="'#50bfff'"
      ></gull-progress>
      <p>
        你也许还能再吃 <strong>40104</strong> 顿饭，度过
        <strong>1909</strong> 个愉快的周末，以及享受
        <strong>3660</strong> 个美妙的夜晚.
      </p>
    </div>
    <div class="detail-box">
      <p>今<strong>天</strong>还余下大约 1 小时</p>
      <gull-progress
        :bar-width="'3%'"
        :bar-bg-color="'#ff4949'"
      ></gull-progress>

      <p>本<strong>周</strong>还余下 3 天</p>
      <gull-progress
        :bar-width="'43%'"
        :bar-bg-color="'#f7ba2a'"
      ></gull-progress>

      <p>这个<strong>月</strong>还余下 11 天</p>
      <gull-progress
        :bar-width="'36%'"
        :bar-bg-color="'#f7ba2a'"
      ></gull-progress>

      <p>2022 <strong>年</strong>还余下 12 个月</p>
      <gull-progress
        :bar-width="'95%'"
        :bar-bg-color="'#13ce66'"
      ></gull-progress>
    </div>
  </div>
  <gull-modal-form
    isScroll
    :options="options"
    title="设置"
    width="50%"
    v-model:visible="visible"
    ref="modalForm"
  >
    <template #footer="scope">
      <el-button @click="cancel(scope.form)">取消</el-button>
      <el-button type="primary" @click="confirm(scope.form)">确认</el-button>
    </template>
    <template #uploadArea>
      <el-button size="small" type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div style="color: #ccc; font-size: 12px">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </gull-modal-form>
</template>

<style scoped lang="less">
.life-container {
  width: 90vw;
  height: auto;
  margin: 20px auto;
}
.title {
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.author {
  text-align: center;
}
.summary-box {
  border-bottom: 1px solid #eee;
}
</style>
