import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Spacer,
  VStack,
  Select,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { Memo } from '../../../common/memo.type';
import { memoState } from '../../../states/memoState';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { important } from '~/src/const/important';
import { types } from '~/src/const/types';

const PostView: NextPage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const raw = input.content;
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
              ????????????
            </Button>
          </Flex>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <VStack gap={5}>
              <FormControl>
                <FormLabel fontSize='xs'>????????????</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='title'
                  fontFamily='mono'
                  {...register('title')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>??????</FormLabel>
                <Select
                  variant='flushed'
                  placeholder='???????????????????????????'
                  {...register('type')}
                >
                  {types.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>?????????</FormLabel>
                <Select
                  variant='flushed'
                  placeholder='???????????????????????????'
                  {...register('important')}
                >
                  {important.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
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
                <FormLabel fontSize='xs'>????????????</FormLabel>
                <Input
                  type='text'
                  variant='flushed'
                  placeholder='content'
                  fontFamily='mono'
                  {...register('content')}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>??????</FormLabel>
                <div>
                  <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder='?????????????????????????????????????????????'
                    fontFamily='mono'
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
                ???????????????
              </Button>
            </Flex>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default PostView;
