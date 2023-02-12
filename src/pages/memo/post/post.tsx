import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Router from 'next/router';
import { title } from 'process';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { Memo } from '../../../common/memo.type';
import { memoState } from '../../../states/memoState';

const PostView: NextPage = () => {
  const [input, setInput] = useRecoilState(memoState);

  const { register, handleSubmit } = useForm<Memo>({
    defaultValues: {
      title: input.title,
      content: input.content,
    },
  });

  const onSubmit = handleSubmit((data: Memo) => {
    setInput((currentInput) => ({
      ...currentInput,
      ...{
        title: data.title,
        url: data.url,
        type: data.type,
        content: data.content,
      },
    }));
    Router.push('/memo/post/post_confirm');
  });
  return (
    <Layout>
      <Box margin='10px'>
        <form onSubmit={onSubmit}>
          <div>
            <FormControl>
              <FormLabel>title</FormLabel>
              <Input type='text' {...register('title')} />
            </FormControl>
            <FormControl>
              <FormLabel>type</FormLabel>
              <Input type='text' {...register('type')} />
            </FormControl>
            <FormControl>
              <FormLabel>url</FormLabel>
              <Input type='text' {...register('url')} />
            </FormControl>
            <FormControl>
              <FormLabel>content</FormLabel>
              <Input type='text' {...register('content')} />
            </FormControl>
          </div>
          <div>
            <Button type='submit'>confirm</Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default PostView;
