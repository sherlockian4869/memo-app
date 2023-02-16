import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

interface Props {
  title: string;
  content: string;
}

const ContentsCard = ({ title, content }: Props) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      marginY='5px'
      marginX='30px'
      padding='15px'
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
