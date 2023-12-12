'use client';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import Modal from './components/modal';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Page({ searchParams }: SearchParamProps) {
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<{
    id: string;
    task: string;
    create_date: string;
  } | null>(null);
  const currentDate = new Date();
  const formattedDateTime = currentDate.toISOString();
  const id = Date.parse(formattedDateTime).toString();
  const show = searchParams?.show;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR('http://127.0.0.1:8000/tasks/', fetcher);

  // todo 추가
  const addTodo = async () => {
    try {
      if (!newTodo.trim()) {
        // 값이 비어 있을 때 토스트 표시
        toast.error('할 일을 입력하세요!');
        return;
      }
      await fetch('http://127.0.0.1:8000/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          task: newTodo,
          create_date: formattedDateTime,
        }),
      });

      setNewTodo('');
      // 데이터 갱신
      mutate('http://127.0.0.1:8000/tasks/');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // todo 삭제
  const deleteTodo = async (id: any) => {
    try {
      await fetch(`http://127.0.0.1:8000/tasks/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      // 데이터 갱신
      mutate('http://127.0.0.1:8000/tasks/');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // enter 시 add
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const selectTodo = async (id: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSelectedTodo(data);
    } catch (error) {
      console.error('Error selecting todo:', error);
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="h-100 bg-teal-lightest flex w-full items-center justify-center font-sans">
        <div className="m-4 w-full rounded bg-white p-6 shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="mt-4 flex">
              <input
                className="text-grey-darker mr-4 w-full appearance-none rounded border px-3 py-2 shadow"
                placeholder="Add Todo"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
              />
              <button
                className="text-md h-8 rounded-full border border-blue-400 px-3 font-bold text-blue-400 hover:bg-blue-100"
                onClick={() => addTodo()}
              >
                Add
              </button>
              {/* 토스트 컨테이너 */}
              <ToastContainer />
            </div>
          </div>
          <div>
            {todos.map((todo: any) => (
              <div
                className="flex cursor-pointer items-center justify-between border-t p-3  "
                key={todo.id}
              >
                <div className="flex items-center  overflow-hidden whitespace-normal">
                  <div className="ml-2 flex flex-col">
                    <div className=" text-sm font-bold leading-snug text-gray-900">
                      {todo.task}
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex ">
                  <button
                    className="text-md ml-1 h-8 rounded-full border border-blue-400 px-3 font-bold text-blue-400 hover:bg-blue-100 "
                    onClick={() => selectTodo(todo.id)}
                  >
                    <Link href="/dashboard/todo/?show=true">Edit</Link>
                  </button>

                  <button
                    className="text-md ml-1 h-8 rounded-full border border-blue-400 px-3 font-bold text-blue-400 hover:bg-red-100"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                  {selectedTodo && show && <Modal {...selectedTodo} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
