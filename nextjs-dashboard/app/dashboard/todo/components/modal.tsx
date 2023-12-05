'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

interface Props {
  id: string;
  task: string;
  create_date: string;
}
export default function Modal(props: Props) {
  const [newTodo, setNewTodo] = useState(props.task);
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString();

  const updateTodo = async (id: any) => {
    try {
      if (newTodo !== null) {
        await fetch(`http://127.0.0.1:8000/tasks/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            task: newTodo,
            create_date: formattedDateTime,
          }),
        });
        // 데이터 갱신
        mutate('http://127.0.0.1:8000/tasks/');
      }
    } catch (error) {
      console.error('Error updateing todo:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="w-96 rounded-md border bg-white p-8 shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Todo Update</h3>
          <div className="mt-2 px-7 py-3">
            <input
              className="text-grey-darker mr-4 w-full appearance-none rounded border px-3 py-2 shadow"
              placeholder="Add Todo"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => updateTodo(props.id)}
            >
              <Link href="/dashboard/todo">Update</Link>
            </button>
            {/* Navigates back to the base URL - closing the modal */}
            <Link
              href="/dashboard/todo"
              className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
