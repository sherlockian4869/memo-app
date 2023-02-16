import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
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
      query: id,
    });
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      marginY='5px'
      marginX='30px'
      padding='15px'
      onClick={() => transition_detail('/memo/detail')}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '150px' }}
        src='/favicon.ico'
      />

      <Stack>
        <CardBody paddingX='5vw'>
          <Heading size='md'>{title}</Heading>

          <Text py='2'>{content}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ContentsCard;
