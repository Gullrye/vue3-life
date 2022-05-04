import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStorage, StorageSerializers } from '@vueuse/core'

const user = useStorage('user', null, undefined, {
  serializer: StorageSerializers.object
})

export const useUser = () => {
  const loginModel = ref({
    username: '',
    password: ''
  })
  const login = async () => {
    user.value = { id: 1, username: loginModel.value.username }
    ElMessage.success('Login success')
  }
  const loggedIn = computed(() => user.value?.id)
  const logout = async () => {
    user.value = null
    ElMessage.success('logout success')
  }
  const registryModel = ref({})
  const registry = async () => {
    ElMessage.success('registry success')
  }
  return {
    user,
    loginModel,
    login,
    loggedIn,
    logout,
    registryModel,
    registry
  }
}
