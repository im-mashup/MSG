import { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from 'react';
import { Modal } from '@/components/common';
import * as Styled from './ConfirmModalDialog.styled';

export interface ConfirmModalDialogProps {
  heading: string;
  paragraph: string;
  handleCancelButton: MouseEventHandler<HTMLButtonElement>;
  handleApprovalButton: MouseEventHandler<HTMLButtonElement>;
  cancelButtonMessage: string;
  approvalButtonMessage: string;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  beforeRef?: MutableRefObject<HTMLButtonElement>;
  deemClose?: boolean;
  escClose?: boolean;
}

const ConfirmModalDialog = ({
  heading,
  paragraph,
  handleCancelButton,
  handleApprovalButton,
  cancelButtonMessage,
  approvalButtonMessage,
  beforeRef,
  setIsOpenModal,
  deemClose,
  escClose,
}: ConfirmModalDialogProps) => {
  return (
    <Modal
      beforeRef={beforeRef}
      setIsOpenModal={setIsOpenModal}
      deemClose={deemClose}
      escClose={escClose}
    >
      <Styled.Dialog>
        <Styled.DialogInner>
          <Styled.Heading>{heading}</Styled.Heading>
          <Styled.Paragraph>{paragraph}</Styled.Paragraph>
        </Styled.DialogInner>
        <Styled.DialogFooter>
          <Styled.CancelButton type="button" onClick={handleCancelButton}>
            {cancelButtonMessage}
          </Styled.CancelButton>
          <Styled.ApprovalButton type="button" onClick={handleApprovalButton}>
            {approvalButtonMessage}
          </Styled.ApprovalButton>
        </Styled.DialogFooter>
      </Styled.Dialog>
    </Modal>
  );
};

export default ConfirmModalDialog;
