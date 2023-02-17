import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Spacer,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Router from 'next/router';
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
      url: input.url,
      type: input.type,
      important: input.important,
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
        important: data.important,
        content: data.content,
      },
    }));
    Router.push('/memo/post/post_confirm');
  });
  return (
    <Layout>
      <Box paddingY='10px' paddingX='100px'>
        <div>
          <Flex py='4' justifyContent='space-between' alignItems='center'>
            <Button
              onClick={() => window.history.back()}
              colorScheme='green'
              variant='solid'
            >
              トップへ
            </Button>
          </Flex>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <VStack gap={5}>
              <FormControl>
                <FormLabel fontSize='xs'>タイトル</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='title'
                  fontFamily='mono'
                  {...register('title')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>種別</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='type'
                  fontFamily='mono'
                  {...register('type')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>重要度</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='important'
                  fontFamily='mono'
                  {...register('important')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>url</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='url'
                  fontFamily='mono'
                  {...register('url')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>内容</FormLabel>
                <Textarea
                  placeholder='content'
                  height='xs'
                  size='md'
                  resize='none'
                  fontFamily='mono'
                  {...register('content')}
                />
              </FormControl>
            </VStack>
          </div>
          <div>
            <Flex py='4' justifyContent='space-between' alignItems='center'>
              <Spacer />
              <Button type='submit' colorScheme='linkedin'>
                確認画面へ
              </Button>
            </Flex>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default PostView;
