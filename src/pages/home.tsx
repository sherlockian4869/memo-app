import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Data } from '../common/data.type';
import ContentsCard from '../components/ContentsCard';
import Layout from '../components/Layout';
import { types } from '../const/types';
import { getMemoListSnapshot } from '../firebase/apis/memo';
import { dataState } from '../states/dataState';
import { memoState } from '../states/memoState';

const HomeView: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useRecoilState(dataState);
  const resetMemoState = useResetRecoilState(memoState);

  useEffect(() => {
    const dataList: Data[] = [];
    getMemoListSnapshot().then((e) => {
      e.forEach((doc) =>
        dataList.push({
          id: doc.id,
          url: doc.data().url,
          type: doc.data().type,
          title: doc.data().title,
          content: doc.data().content,
          createdAt: doc.data().createdAt,
          important: doc.data().important,
        })
      );
      setData(dataList);
      resetMemoState();
    });
  }, []);
  return (
    <>
      <Layout>
        <Box margin='10px'>
          <Container maxW='container.2xl'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Spacer />
              <Button
                margin='10px'
                onClick={() => router.push('/memo/post/post')}
              >
                新規作成
              </Button>
            </Flex>
          </Container>
          <Tabs variant='enclosed'>
            <TabList>
              {types.map((result) => (
                <Tab>{result}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {types.map((type) => (
                <TabPanel>
                  {data
                    .filter((data) => data.type === type)
                    .map((info) => (
                      // <HStack>
                      //   <VStack spacing={4} direction='column'>
                      //     <ContentsCard title={info.title} content='テスト' />
                      //   </VStack>
                      // </HStack>
                      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <GridItem>
                          <ContentsCard title={info.title} content='テスト' />
                        </GridItem>
                      </Grid>
                    ))}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </>
  );
};

export default HomeView;
