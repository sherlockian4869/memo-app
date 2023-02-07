//TodoContainer.tsx
import { useRecoilState, useRecoilValue } from 'recoil';
import { todosState } from '../../states/todoState';
import { TodoPresenter } from './todoPresenter';

export const TodoContainer = () => {
  //TodoContainer.tsx
  const [todos, setTodos] = useRecoilState(todosState);
  const todos = useRecoilValue(todosState);

  const args = {
    todos,
  };
  return <TodoPresenter {...args} />;
};
