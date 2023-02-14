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
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import ConfirmModal from '~/src/components/ConfirmModal';
import Layout from '~/src/components/Layout';
import { memoState } from '../../../states/memoState';

const PostConfirmView: NextPage = () => {
  const input = useRecoilValue(memoState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
              <FormLabel fontSize='xs'>url</FormLabel>
              <Text fontFamily='mono'>{input.url}</Text>
              <Divider />
            </FormControl>
            <FormControl>
              <FormLabel fontSize='xs'>内容</FormLabel>
              <Text fontFamily='mono'>{input.content}</Text>
              <Divider />
            </FormControl>
          </VStack>
        </div>
        <div>
          <Flex py='4' justifyContent='space-between' alignItems='center'>
            <Spacer />
            <Button onClick={() => setIsOpen(true)}>登録</Button>
          </Flex>
        </div>
        <ConfirmModal
          isModalOpen={isOpen}
          onModalClose={() => setIsOpen(false)}
          modalTitle='メモの登録'
        />
      </Box>
    </Layout>
  );
};

export default PostConfirmView;
