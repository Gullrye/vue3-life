import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { $http } from '@/utils/request'

export interface LifeType {
  _id: string
  __v: number
  username: string
  lifeEnd: number
  lightOrDark: number
  firstDay: number
  beWorry: boolean
}

const lifeData = ref<LifeType[]>()
const lifeDetail = ref<LifeType>()
const visible = ref<boolean>(false)

const getLifeList = () => {
  $http.get('/life').then((res: any) => {
    const { data } = res
    lifeData.value = data
  })
}
const getLifeDetail = (id: string) => {
  $http.get(`/life/${id}`).then((res: any) => {
    const { data } = res
    lifeDetail.value = data
  })
}
const editLife = (id: string, params: any) => {
  $http.put(`/life/${id}`, params).then((res: any) => {
    const { message } = res
    ElMessage({
      type: 'success',
      showClose: true,
      message: message,
      duration: 1500
    })
    visible.value = false
    getLifeList()
  })
}
const delLife = (id: string) => {
  $http.delete(`/life/${id}`).then((res: any) => {
    const { message } = res
    ElMessage({
      type: 'success',
      showClose: true,
      message: message,
      duration: 1500
    })
    getLifeList()
  })
}
const addLife = (params: any) => {
  $http.post('/life', params).then((res: any) => {
    const { message } = res
    ElMessage({
      type: 'success',
      showClose: true,
      message: message,
      duration: 1000
    })
    visible.value = false
    getLifeList()
  })
}
const open = ($event: any, id: string) => {
  if (id) {
    getLifeDetail(id)
  } else {
    lifeDetail.value = {} as LifeType
  }
  visible.value = true
}

export default {
  lifeData,
  lifeDetail,
  visible,
  getLifeList,
  getLifeDetail,
  addLife,
  editLife,
  delLife,
  open
}
