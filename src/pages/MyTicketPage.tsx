import React, { useState } from 'react'
import Ticket from '@/components/local/myticket/Ticket'
const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Chưa sử dụng' },
  { id: 3, label: 'Đã sử dụng' },
  { id: 4, label: 'Đã hủy' }
]

type TabContentProps = {
  content: string
  isActive: boolean
}

const TabContent: React.FC<TabContentProps> = ({ content, isActive }) => (
  <div className={`w-full  border-md p-4 ${isActive ? 'block' : 'hidden'}`}>
    <p>{content}</p>
  </div>
)
function MyTicketPage() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div className='w-full max-w-5xl mx-auto mt-10  '>
      <div className='relative flex border-b py-1 border-gray-200 bg-muted rounded-md'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative py-2 px-4 transition-colors hover:text-primary duration-300 ${
              activeTab === tab.id ? 'text-primary font-medium' : 'text-gray-500'
            }`}
            style={{ width: `calc(100% / ${tabs.length})` }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <span
          className='absolute bottom-0 left-0 h-[3px] bg-primary transition-transform duration-300'
          style={{ width: `calc(100% / ${tabs.length})`, transform: `translateX(${(activeTab - 1) * 100}%)` }}
        />
      </div>
      
      <div className='mt-4 bg-muted '>
        {tabs.map((tab) => (
          <TabContent key={tab.id} content={`Nội dung cho ${tab.label}`} isActive={activeTab === tab.id} />
        ))}
        <Ticket/>
      </div>

    </div>
  )
}

export default MyTicketPage
