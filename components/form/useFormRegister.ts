import { useEffect, useRef } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { HOOK_MARK } from 'rc-field-form/lib/FieldContext'
// eslint-disable-next-line import/no-extraneous-dependencies
import { InternalNamePath } from 'rc-field-form/lib/interface'
import { FormInstance } from 'antd/lib/form'
import { Func } from '../utils/type'

/**
 * Use rc-field-form internal func register name
 */
export default function useFormRegister(
  form: FormInstance & { getInternalHooks?: Func },
  names: InternalNamePath[]
) {
  const registered = useRef<Func[]>([])

  const register = () => {
    registered.current = names.map((name) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return form.getInternalHooks!(HOOK_MARK).registerField({
        onStoreChange: () => undefined,
        getMeta: () => undefined,
        getNamePath: () => name,
        props: {},
      })
    })
  }

  const unRegister = () => {
    if (!registered.current.length) {
      return
    }

    registered.current.forEach((unRegisterFunc) => unRegisterFunc())
    registered.current = []
  }

  useEffect(() => {
    register()
    return unRegister
  }, [form])
}
