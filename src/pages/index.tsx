import type { NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { Memo } from '../common/memo.type';
import { memoState } from '../states/memoState';

const Home: NextPage = () => {
  const [input, setInput] = useRecoilState(memoState);

  const { register, handleSubmit } = useForm<Memo>({
    defaultValues: {
      id: input.id,
      title: input.title,
      content: input.content,
    },
  });

  const onSubmit = handleSubmit((data: Memo) => {
    setInput((currentInput) => ({
      ...currentInput,
      ...{
        id: data.id,
        title: data.title,
        content: data.content,
      },
    }));
    Router.push('/memo/post/post_confirm');
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>id:</span>
            <input type='text' {...register('id')} />
          </label>
        </div>
        <div>
          <label>
            <span>title:</span>
            <input type='text' {...register('title')} />
          </label>
        </div>
        <div>
          <label>
            <span>content:</span>
            <input type='text' {...register('content')} />
          </label>
        </div>
        <div>
          <button type='submit'>confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
