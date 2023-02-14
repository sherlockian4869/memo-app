import { Button, Box, Flex, Heading } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/apis/auth';

export default function LoginPage() {
  return (
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
  );
}
