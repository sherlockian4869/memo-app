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
  Center,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Data } from '~/src/common/data.type';
import Layout from '~/src/components/Layout';
import { dataState } from '~/src/states/dataState';
import { memoState } from '~/src/states/memoState';

const DetailView: NextPage = () => {
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : '';
  const info = useRecoilValue(dataState);
  const [data, setData] = useRecoilState(memoState);
  const [temp, setTemp] = useState<Data>();
  useEffect(() => {
    // findに変更したら単一取得が可能
    const result = info.find((item) => {
      item.id === id;
    });
    setTemp(result);
  }, []);
  return (
    <>
      {typeof temp == undefined ? (
        <Box
          h='90vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner size='xl' />
        </Box>
      ) : (
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
                  <Text fontFamily='mono'>{temp.id}</Text>
                  <Divider />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs'>種別</FormLabel>
                  <Text fontFamily='mono'>{temp.type}</Text>
                  <Divider />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs'>重要度</FormLabel>
                  <Text fontFamily='mono'>{temp.important}</Text>
                  <Divider />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs'>url</FormLabel>
                  <Text fontFamily='mono'>{temp.url}</Text>
                  <Divider />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs'>内容</FormLabel>
                  <Text fontFamily='mono'>{temp.content}</Text>
                  <Divider />
                </FormControl>
              </VStack>
            </div>
          </Box>
        </Layout>
      )}
      ;
    </>
  );
};

export default DetailView;
