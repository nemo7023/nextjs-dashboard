'use client';
import useSWR from 'swr';

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    'http://127.0.0.1:8000/emps',
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const names = data.map((item: any, index: any) => {
    return item.ename;
  });
  return (
    <>
      <h1 className="text-3xl">Dashboard Page</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {names.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
