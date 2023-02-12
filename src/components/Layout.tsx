import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { logout } from '../firebase/apis/auth';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <Box px={4} bgColor='gray.100'>
          <Container maxW='container.xl'>
            <Flex
              as='header'
              py='4'
              justifyContent='space-between'
              alignItems='center'
            >
              <Link href='/' passHref>
                <Heading as='h1' fontSize='2xl' cursor='pointer'>
                  My Tech Blog
                </Heading>
              </Link>
              <Button colorScheme='red' onClick={() => logout()}>
                ログアウト
              </Button>
            </Flex>
          </Container>
        </Box>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
