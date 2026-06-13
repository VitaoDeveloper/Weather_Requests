import type { ModalProps } from '../types/ModalProps'
import * as Dialog from '@radix-ui/react-dialog'
import { type JSX, useState } from 'react'
import { FormatInputType } from '../utils/formatInputType'

export function Modal({
  open,
  onClose,
  onSubmit,
  title,
  inputs,
}: ModalProps) {
    
    const [values, setValues] = useState<Record<string, string>>(
      () => Object.fromEntries(inputs!.map(i => [i.label, '']))
    )

    const modalInputs: JSX.Element[] = []

    if (inputs) {

      const handleChange = (label: string, value: string) => {
        setValues(prev => ({ ...prev, [label]: value }))
      }

      for (const input of inputs) {
        modalInputs.push(
          <div className="modal-field">
            <label htmlFor="val1">{input.label}</label>
              <input
                id="val1"
                type={input.type}
                value={values[input.label]}
                onChange={e => handleChange(input.label, e.target.value)}
                placeholder={input.placeholder}/>
          </div>
        )
      }
    }

    const handleSubmit = () => {
      if (inputs) {
        const args = inputs.map(i => FormatInputType.format(i, values))
        onSubmit(...args)
        setValues(Object.fromEntries(inputs.map(i => [i.label, ''])))
        onClose()
      }
    }
  
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal">

          <div className="modal-header">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close className="modal-close">✕</Dialog.Close>
          </div>

          {modalInputs}

          <div className="modal-footer">
            <Dialog.Close className="modal-btn-cancel">Close</Dialog.Close>
            <button className="modal-btn-confirm" onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}