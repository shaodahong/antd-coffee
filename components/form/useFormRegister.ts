import { useEffect, useRef } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { HOOK_MARK } from 'rc-field-form/lib/FieldContext'
import { FormInstance } from 'antd/lib/form'
import { Func } from '../utils/type'

export default function useFormRegister(
  form: FormInstance & { getInternalHooks: Func },
  names: string[]
) {
  const registered = useRef<Func[]>([])
  const register = () => {
    registered.current = names.map((name) => {
      return form.getInternalHooks(HOOK_MARK).registerField({
        onStoreChange: () => undefined,
        getMeta: () => undefined,
        getNamePath: () => name,
        props: {},
      })
    })
  }

  const unRegister = () => {
    registered.current.forEach((unRegisterFunc) => unRegisterFunc())
  }

  useEffect(() => {
    register()
    return unRegister
  }, [form])
}
