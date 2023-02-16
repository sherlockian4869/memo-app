import {
  Box,
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  Divider,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Layout from '~/src/components/Layout';
import { dataState } from '~/src/states/dataState';
import { memoState } from '~/src/states/memoState';

const DetailView: NextPage = () => {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : '';
  const info = useRecoilValue(dataState);
  const [data, setData] = useRecoilState(memoState);
  useEffect(() => {
    const result = info.filter((item) => {
      item.id === id;
    });
    setData({
      title: result[0].title,
      url: result[0].url,
      type: result[0].type,
      important: result[0].important,
      content: result[0].content,
    });
  }, []);
  return (
    <>
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
                <Text fontFamily='mono'>{data.url}</Text>
                <Divider />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xs'>内容</FormLabel>
                <Text fontFamily='mono'>{data.content}</Text>
                <Divider />
              </FormControl>
            </VStack>
          </div>
        </Box>
      </Layout>
    </>
  );
};

export default DetailView;
