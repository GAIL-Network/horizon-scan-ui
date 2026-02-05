import { Modal, ModalProps } from "@/components/Modal";

type Props = ModalProps;

export function LoginModal({ ...rest }: Props) {
  return <Modal {...rest} />;
}
