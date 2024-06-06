import { Button } from '@/components/global/atoms/button'
import { Input } from '@/components/global/atoms/input'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface QuantityInputProps {
  initialValue: number
  onUpdate: (newQuantity: number) => void
}

function QuantityInput({ initialValue, onUpdate }: QuantityInputProps) {
  const [quantity, setQuantity] = useState(initialValue)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      onUpdate(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
    onUpdate(quantity + 1)
  }

  const handleChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value)
    if (!isNaN(newQuantity)) {
      if (newQuantity <= 0) {
        setQuantity(1)
      } else {
        setQuantity(newQuantity)
        onUpdate(newQuantity)
      }
    }
  }

  return (
    <div className='flex items-center space-x-2 justify-end'>
      <Button size={'icon'} className='rounded-full h-fit w-fit opacity-80' onClick={handleDecrease} disabled={quantity === 1}>
        <Minus />
      </Button>
      <Input className='w-1/5 h-8' type='tel' value={quantity} onChange={handleChange} min={1} />
      <Button size={'icon'} className='rounded-full h-fit w-fit opacity-80' onClick={handleIncrease}>
        <Plus />
      </Button>
    </div>
  )
}

export default QuantityInput
