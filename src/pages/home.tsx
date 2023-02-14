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
import { useEffect, useState } from 'react';
import ContentsCard from '../components/ContentsCard';
import Layout from '../components/Layout';
import { getType } from '../firebase/apis/memo';

const types = ['Salesforce', 'Next', 'Nuxt', 'Git', 'Components'];
const contents = ['Salesforce', 'Next', 'Nuxt', 'Git', 'Components'];
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
  // const [type, setType] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getType();
  //     setType(data);
  //   };
  //   getData();
  // }, []);
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
              {/* {type.map((result) => (
                <Tab>{result}</Tab>
              ))} */}
              {types.map((result) => (
                <Tab>{result}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {types.map((type) => (
                <TabPanel>
                  {info
                    .filter((data) => data.types === type)
                    .map((info) => (
                      <Stack spacing={4} direction='column'>
                        <ContentsCard title={info.types} content='テスト' />
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
