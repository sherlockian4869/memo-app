import { Card, CardBody, Flex, Heading, Image, Text } from '@chakra-ui/react';
import router from 'next/router';

interface Props {
  id: string;
  title: string;
  content: string;
}

const ContentsCard = ({ id, title, content }: Props) => {
  const transition_detail = (path: string) => {
    router.push({
      pathname: path,
      query: { id: id },
    });
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      minW='xl'
      overflow='hidden'
      variant='outline'
      marginY='5px'
      marginX='20px'
      padding='15px'
      h='25vh'
      w='40vw'
      onClick={() => transition_detail('/memo/detail')}
    >
      <Flex justify='center' align='center' h='20vh'>
        <Image
          objectFit='fill'
          maxW={{ base: '100%', sm: '150px' }}
          maxH={{ base: '100%', sm: '150px' }}
          src='/favicon.ico'
        />
      </Flex>

      <CardBody paddingX='2vw'>
        <Heading fontSize='lg' size='md' noOfLines={1} marginBottom='2vh'>
          {title}
        </Heading>
        <Text fontSize='4xs' noOfLines={3}>
          {content}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ContentsCard;
