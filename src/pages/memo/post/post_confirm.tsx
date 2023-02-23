import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Spacer,
  VStack,
  Text,
  Divider,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { registMemo } from '~/src/firebase/apis/memo';
import { memoState } from '../../../states/memoState';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const PostConfirmView: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const input = useRecoilValue(memoState);
  const resetMemoState = useResetRecoilState(memoState);
  const router = useRouter();
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
  return (
    <Layout>
      <Box marginY='10px' marginX='100px'>
        <div>
          <Flex py='4' justifyContent='space-between' alignItems='center'>
            <Button onClick={() => window.history.back()}>戻る</Button>
          </Flex>
        </div>
        <div>
          <VStack gap={5}>
            <FormControl>
              <FormLabel fontSize='xs'>タイトル</FormLabel>
              <Text fontFamily='mono'>{input.title}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>種別</FormLabel>
              <Text fontFamily='mono'>{input.type}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>重要度</FormLabel>
              <Text fontFamily='mono'>{input.important}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>url</FormLabel>
              <Text fontFamily='mono'>{input.url}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>簡易メモ</FormLabel>
              <Text fontFamily='mono'>{input.content}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>詳細</FormLabel>
              <Editor editorState={editorState} readOnly={true} />
              <Divider />
            </FormControl>
          </VStack>
        </div>
        <div>
          <Flex py='4' justifyContent='space-between' alignItems='center'>
            <Spacer />
            <Button
              onClick={async () => {
                await registMemo(
                  input.url,
                  input.type,
                  input.title,
                  input.content,
                  input.important,
                  input.document
                );
                onOpen();
              }}
            >
              登録
            </Button>
          </Flex>
        </div>
        <Modal
          closeOnOverlayClick={false}
          size='md'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton
              bg='gray.100'
              color='grey'
              onClick={() => {
                router.push('/');
                resetMemoState();
                EditorState.createEmpty();
                onClose();
              }}
            ></ModalCloseButton>
            <ModalBody>
              <Image borderRadius='2%' src='/night_photo.jpeg'></Image>
              <Box textAlign='center' paddingTop='3vw'>
                <Text fontSize='2xl'>登録完了</Text>
                <br />
                <p>お疲れ様でした。</p>
                <p>メモの登録が完了しました。</p>
              </Box>
            </ModalBody>
            <ModalFooter padding='2vw'></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default PostConfirmView;
