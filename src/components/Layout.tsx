import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { logout } from '../firebase/apis/auth';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
          <Container maxW='container.2xl'>
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
      <div>
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          color={useColorModeValue('gray.700', 'gray.200')}
          minW='100%'
          className={styles.footer}
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}
          >
            <Stack direction={'row'} spacing={6}>
              <Link href={'/'}>Home</Link>
              <Link href={'#'}>About</Link>
              <Link href={'#'}>Contact</Link>
            </Stack>
            <Text>© yaeok.co.jp</Text>
          </Container>
        </Box>
      </div>
    </div>
  );
};

export default Layout;
