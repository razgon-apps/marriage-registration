import { FC } from 'react';

import { StartStep } from 'widgets/start';

export const HomePage: FC = () => {
  return <StartStep />;
};

// // interface Todo {
// //   userId: number;
// //   id: string;
// //   title: string;
// //   completed: boolean;
// // }

// // const addTodo = async (newTodo: Todo): Promise<void> => {
// //   const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
// //     method: 'POST',
// //     body: JSON.stringify(newTodo),
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   });
// //   if (!response.ok) {
// //     throw new Error('Failed to add todo');
// //   }
// // };

// // const mutation = useMutation({
// //   mutationFn: addTodo,
// // });

// {
//   /* {mutation.isPending ? (
//         'Adding todo...'
//       ) : (
//         <>
//           {mutation.isError ? (
//             <div>An error occurred: {mutation.error.message}</div>
//           ) : null}

//           {mutation.isSuccess ? <div>Todo added!</div> : null}

//           <button
//             onClick={() => {
//               mutation.mutate({
//                 id: String(Date.now()),
//                 title: 'Do Laundry',
//                 userId: 1,
//                 completed: true,
//               });
//             }}
//           >
//             Create Todo
//           </button>
//         </>
//       )} */
// }
