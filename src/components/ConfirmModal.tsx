import {
  Box,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  isModalOpen: boolean;
  onModalClose: VoidFunction;
  modalTitle: string;
}

const ConfirmModal = ({ isModalOpen, onModalClose, modalTitle }: Props) => {
  const { onClose } = useDisclosure();
  return (
    <Modal
      closeOnOverlayClick={false}
      size='xl'
      isOpen={isModalOpen}
      onClose={onModalClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          bg='gray.100'
          color='grey'
          onClick={() => onClose()}
        ></ModalCloseButton>
        <ModalBody>
          <Image borderRadius='2%' src='/night_photo.jpeg'></Image>
          <Box textAlign='center' paddingTop='3vw'>
            <Text fontSize='2xl'>{modalTitle}</Text>
            <br />
            <p>お疲れ様でした。</p>
            <p>メモの登録が完了しました。</p>
          </Box>
        </ModalBody>
        <ModalFooter padding='2vw'></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
