<template>
  <BasicModal @register="registerModal" :title="title" @ok="onSubmit">
    <BasicForm @register="registerForm"></BasicForm>
  </BasicModal>
</template>

<script>
import {BasicModal, useModalInner} from "@/components/Modal";
import {BasicForm, useForm} from "@/components/Form";
import {add, edit} from '../myRole/role.api'
import {ref, computed} from "vue";

export default {
  name: "RoleModal",
  components: {
    BasicForm,
    BasicModal,
  },
  emits: ['register', 'success'],
  setup(props, {emit}) {

    const [registerForm, {validate, resetFields, setFieldsValue}] = useForm({
      schemas: [
        {
          label: "角色名称",
          field: 'roleName',
          component: 'Input'
        },
        {
          label: "角色编码",
          field: 'roleCode',
          component: 'Input'
        },
        {
          label: "备注",
          field: 'description',
          component: 'InputTextArea'
        }
      ],
      showActionButtonGroup: false
    })
    let model = {}
    const isUpdate = ref(false)
    const title = computed(() => isUpdate.value ? '编辑' : '新增')
    const [registerModal, {closeModal}] = useModalInner(async (data) => {
      isUpdate.value = data.isUpdate
      await resetFields()
      if (isUpdate.value) {
        model = data.record
        await setFieldsValue(data.record)
      }
    })

    async function onSubmit() {
      const values = await validate()
      if (isUpdate.value) {
        await edit(Object.assign(model, values))
      } else {
        await add(values)
      }
      closeModal()
      emit('success')
    }

    return {
      registerModal,
      registerForm,
      onSubmit,
      title
    }
  }
}
</script>

<style scoped>

</style>
