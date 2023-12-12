import React from 'react';
import { useRouter } from 'next/router';

interface CardModalProps {
  content: string | null;
  onClose: () => void;
}

export default function CardModal({ props: CardModalProps }) {
  const router = useRouter();

  const handleShowContentPage = () => {
    router.push(`/content/${props.content}`);
    props.onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-md bg-white p-8">
        <h2 className="mb-4 text-xl font-bold">Card Content</h2>
        <p className="mb-4">{props.content}</p>
        <button
          className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleShowContentPage}
        >
          Show Content Page
        </button>
        <button
          className="rounded-md bg-gray-300 px-4 py-2 text-black"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
