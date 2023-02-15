import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Data } from '../common/data.type';
import ContentsCard from '../components/ContentsCard';
import Layout from '../components/Layout';
import { types } from '../const/types';
import { getMemoListSnapshot } from '../firebase/apis/memo';
import { dataState } from '../states/dataState';

const info = [
  {
    types: 'Salesforce',
    contents: 'Salesforce',
  },
  {
    types: 'Salesforce',
    contents: 'Salesforce',
  },
  {
    types: 'Salesforce',
    contents: 'Salesforce',
  },
  {
    types: 'Next',
    contents: 'Next',
  },
  {
    types: 'Nuxt',
    contents: 'Nuxt',
  },
  {
    types: 'Git',
    contents: 'Git',
  },
  {
    types: 'Components',
    contents: 'Components',
  },
];

const HomeView: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useRecoilState(dataState);
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
        })
      );
      setData(dataList);
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
                      <Stack spacing={4} direction='column'>
                        <ContentsCard title={info.title} content='テスト' />
                      </Stack>
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
