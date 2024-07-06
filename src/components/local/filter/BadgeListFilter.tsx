import React from 'react'
import { XIcon } from 'lucide-react'

interface BadgeListProps {
  items: ReadonlyArray<{ id: string; label: string }>
  selectedFilters: { type: string; id: string }[]
  onFilterRemove: (type: string, id: string) => void
}

const BadgeList: React.FC<BadgeListProps> = ({ items, selectedFilters, onFilterRemove }) => {
  const handleDelete = (type: string, id: string) => {
    onFilterRemove(type, id)
  }

  return (
    <div className='flex flex-wrap'>
      {selectedFilters.map(({ type, id }) => {
        const item = items.find((i) => i.id === id)
        return (
          <span
            key={id}
            className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mr-2 mb-2'
          >
            {item?.label}
            <XIcon
              className='ml-2 h-4 w-4 cursor-pointer'
              onClick={() => handleDelete(type, id)}
            />
          </span>
        )
      })}
    </div>
  )
}

export default BadgeList
