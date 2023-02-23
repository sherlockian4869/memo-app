import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { Memo } from '../../../common/memo.type';
import { memoState } from '../../../states/memoState';
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';

const UpdateView: NextPage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const raw = input.document;
    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };
  const [input, setInput] = useRecoilState(memoState);

  const { register, handleSubmit } = useForm<Memo>({
    defaultValues: {
      title: input.title,
      url: input.url,
      type: input.type,
      important: input.important,
      content: input.content,
      document: editorState,
    },
  });

  const onSubmit = handleSubmit((data: Memo) => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const document = JSON.stringify(raw);
    setInput((currentInput) => ({
      ...currentInput,
      ...{
        title: data.title,
        url: data.url,
        type: data.type,
        important: data.important,
        content: data.content,
        document: document,
      },
    }));
    Router.push('/memo/update/update_confirm');
  });
  return (
    <Layout>
      <Box paddingY='10px' paddingX='100px'>
        <div>
          <Flex py='4' justifyContent='space-between' alignItems='center'>
            <Button onClick={() => window.history.back()}>戻る</Button>
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
                <FormLabel fontSize='xs'>簡易メモ</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='content'
                  fontFamily='mono'
                  {...register('content')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>詳細</FormLabel>
                <div>
                  <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder='ここから入力を行ってください。'
                    handleKeyCommand={handleKeyCommand}
                  />
                </div>
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

export default UpdateView;
