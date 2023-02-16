import { Button, Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/apis/auth';
import { useAuth } from '../../firebase/apis/auth';

export default function LoginPage() {
  const user = useAuth();
  return (
    <>
      {user == null ? (
        <Box
          h='90vh'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner size='xl' />
        </Box>
      ) : (
        <Box display='grid' justifyContent='center'>
          <Flex h='10vw' justify='center' align='center'>
            <Heading>My Memo Blog</Heading>
          </Flex>
          <Flex
            h='50vh'
            w='30vw'
            justify='center'
            align='center'
            border='solid 0.5px'
          >
            <Button colorScheme='teal' size='md' onClick={() => googleLogin()}>
              Googleアカウントでログインする
            </Button>
          </Flex>
        </Box>
      )}
      ;
    </>
  );
}
