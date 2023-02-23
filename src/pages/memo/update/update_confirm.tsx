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
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Layout from '~/src/components/Layout';
import { updateMemo } from '~/src/firebase/apis/memo';
import { memoState } from '../../../states/memoState';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { useEffect, useState } from 'react';

const PostConfirmView: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const update = useRecoilValue(memoState);
  const resetMemoState = useResetRecoilState(memoState);
  const router = useRouter();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const raw = update.document;
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
              <Text fontFamily='mono'>{update.title}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>種別</FormLabel>
              <Text fontFamily='mono'>{update.type}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>重要度</FormLabel>
              <Text fontFamily='mono'>{update.important}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>url</FormLabel>
              <Text fontFamily='mono'>{update.url}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>簡易メモ</FormLabel>
              <Text fontFamily='mono'>{update.content}</Text>
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
                await updateMemo(
                  update.id,
                  update.url,
                  update.type,
                  update.title,
                  update.content,
                  update.important,
                  update.document
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
                onClose();
              }}
            ></ModalCloseButton>
            <ModalBody>
              <Image borderRadius='2%' src='/night_photo.jpeg'></Image>
              <Box textAlign='center' paddingTop='3vw'>
                <Text fontSize='2xl'>更新完了</Text>
                <br />
                <p>お疲れ様でした。</p>
                <p>メモの更新が完了しました。</p>
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
