import { Button } from '@/components/global/atoms/button'
import { Input } from '@/components/global/atoms/input'
import { Minus, Plus } from 'lucide-react'

interface QuantityInputProps {
  initialValue: number
  onUpdate: (newQuantity: number) => void
}

function QuantityInput({ initialValue, onUpdate }: QuantityInputProps) {
  // const [quantity, setQuantity] = useState(initialValue)

  const handleDecrease = () => {
    if (initialValue > 1) {
      onUpdate(initialValue - 1)
    } else {
      onUpdate(0)
    }
  }

  const handleIncrease = () => {
    // setQuantity(quantity + 1)
    onUpdate(initialValue + 1)
  }

  const handleChange = (event: { target: { value: string } }) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value <= 0) {
      onUpdate(0);
    } else {
      onUpdate(value);
    }
  }

  return (
    <div className='flex items-center space-x-2 justify-end'>
      <Button size={'icon'} className='rounded-full h-fit w-fit opacity-80' onClick={handleDecrease}>
        <Minus />
      </Button>
      <Input className='w-10 h-8' type='tel' value={initialValue} onChange={handleChange} min={1} />
      <Button size={'icon'} className='rounded-full h-fit w-fit opacity-80' onClick={handleIncrease}>
        <Plus />
      </Button>
    </div>
  )
}

export default QuantityInput
