import {
  Box,
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  Divider,
  Spinner,
  Spacer,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { getMemo } from '~/src/firebase/apis/memo';
import { memoState } from '~/src/states/memoState';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { useEffect, useState } from 'react';

const DetailView: NextPage = () => {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : '';
  const [data, setData] = useRecoilState(memoState);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    getMemo(id).then((result) => {
      setData({
        id: result.id,
        url: result.data().url,
        type: result.data().type,
        important: result.data().important,
        title: result.data().title,
        content: result.data().content,
        document: result.data().document,
      });
      const raw = result.data().document;
      if (raw) {
        const contentState = convertFromRaw(JSON.parse(raw));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      }
    });
  }, []);
  return (
    <Layout>
      {typeof data == null ? (
        <Box
          h='90vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner size='xl' />
        </Box>
      ) : (
        <Box marginY='10px' marginX='100px'>
          <div>
            <Flex py='4' justifyContent='space-between' alignItems='center'>
              <Button onClick={() => window.history.back()}>戻る</Button>
              <Spacer />
              <Button onClick={() => router.push('/memo/update/update')}>
                更新
              </Button>
            </Flex>
          </div>
          <div>
            <VStack gap={5}>
              <FormControl>
                <FormLabel fontSize='xs'>タイトル</FormLabel>
                <Text fontFamily='mono'>{data.title}</Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>種別</FormLabel>
                <Text fontFamily='mono'>{data.type}</Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>重要度</FormLabel>
                <Text fontFamily='mono'>{data.important}</Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>url</FormLabel>
                <Text fontFamily='mono'>
                  <a href={data.url} target='_blank' rel='noopener noreferrer'>
                    {data.url}
                  </a>
                </Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>簡易メモ</FormLabel>
                <Text fontFamily='mono'>{data.content}</Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>詳細</FormLabel>
                <Editor editorState={editorState} readOnly={true} />
                <Divider />
              </FormControl>
            </VStack>
          </div>
        </Box>
      )}
      ;
    </Layout>
  );
};

export default DetailView;
