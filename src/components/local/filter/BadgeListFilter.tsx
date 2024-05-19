import React from 'react'
import { XIcon } from 'lucide-react'

interface BadgeListProps {
  items: ReadonlyArray<{ id: string; label: string }>
  selectedItems: string[]
  onItemsChange: (items: string[]) => void
}

const BadgeList: React.FC<BadgeListProps> = ({ items, selectedItems, onItemsChange }) => {
  const handleDelete = (id: string) => {
    const updatedItems = selectedItems.filter(item => item !== id)
    onItemsChange(updatedItems)
  }

  return (
    <div className='mt-4 flex flex-wrap'>
      {selectedItems.map((itemId) => {
        const item = items.find((i) => i.id === itemId)
        return (
          <span
            key={itemId}
            className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mr-2 mb-2'
          >
            {item?.label}
            <XIcon
              className='ml-2 h-4 w-4 cursor-pointer'
              onClick={() => handleDelete(itemId)}
            />
          </span>
        )
      })}
    </div>
  )
}

export default BadgeList
