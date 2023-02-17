import { Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { googleLogin } from '../../firebase/apis/auth';

export default function LoginPage() {
  return (
    <>
      <Box display='grid' justifyContent='center'>
        <Flex h='10vw' justify='center' align='center'>
          <Heading>My Memo Blog</Heading>
        </Flex>
        <Flex
          h='55vh'
          w='25vw'
          justify='center'
          align='center'
          border='solid 0.5px'
          borderColor='gray.300'
          borderRadius='2xl'
          boxShadow='lg'
        >
          <Button
            colorScheme='whatsapp'
            size='md'
            onClick={() => googleLogin()}
          >
            <Text fontFamily='sans-serif'>Googleアカウントでログインする</Text>
          </Button>
        </Flex>
      </Box>
    </>
  );
}
