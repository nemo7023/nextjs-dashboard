import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

import React, { useState } from 'react';
import CardModal from './cardmodal';

interface CardProps {
  id: Number;
  title: string;
  description: string;
}

export default function Card(porps: CardProps) {
  const [content, setContent] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    if (content) {
      setShowModal(true);
    } else {
      const newContent = prompt('Enter content:');
      setContent(newContent);
    }
  };
  return (
    <div
      className="aspect-[4/4] h-full w-full overflow-hidden rounded shadow-lg "
      onClick={handleCardClick}
    >
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{porps.title}</div>
        <p className="text-base text-gray-700">{porps.description}</p>

        {content || 'Click to add content'}

        {showModal && (
          <CardModal {...content} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}
