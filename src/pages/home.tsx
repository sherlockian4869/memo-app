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
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getType } from '../firebase/apis/memo';

const contents = ['Salesforce', 'Next', 'Nuxt', 'Git'];

const HomeView: NextPage = () => {
  const router = useRouter();
  const [type, setType] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getType();
      setType(data);
    };
    getData();
  });
  return (
    <>
      <Layout>
        <Box margin='10px'>
          <Container maxW='container.xl'>
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
              {type.map((result) => (
                <Tab>{result}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {contents.map((result) => (
                <TabPanel>
                  <p>{result}</p>
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
