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
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='~/public/favicon.ico'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{title}</Heading>

          <Text py='2'>{content}</Text>
        </CardBody>

        <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            Buy Latte
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ContentsCard;
