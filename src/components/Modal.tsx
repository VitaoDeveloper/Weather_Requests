import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (val1: number, val2: number) => void
  title?: string
  label1?: string
  label2?: string
}

export function Modal({
  open,
  onClose,
  onSubmit,
  title = 'Inserir coordenadas',
  label1 = 'Latitude',
  label2 = 'Longitude',
}: Props) {
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')

  const handleSubmit = () => {
    onSubmit(Number(val1), Number(val2))
    setVal1('')
    setVal2('')
    onClose()
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

          <div className="modal-field">
            <label htmlFor="val1">{label1}</label>
            <input
              id="val1"
              type="number"
              value={val1}
              onChange={e => setVal1(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="modal-field">
            <label htmlFor="val2">{label2}</label>
            <input
              id="val2"
              type="number"
              value={val2}
              onChange={e => setVal2(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="modal-footer">
            <Dialog.Close className="modal-btn-cancel">Cancelar</Dialog.Close>
            <button className="modal-btn-confirm" onClick={handleSubmit}>
              Buscar
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}