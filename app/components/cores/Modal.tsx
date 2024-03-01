import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { FC, Fragment, ReactNode } from "react";
import { Button } from "./Button";

type TModal = {
  children: ReactNode;
  onClose?: () => void;
  show: boolean;
};

export const Modal: FC<TModal> = (props: TModal) => {
  const { children, onClose = () => {}, show } = props;

  return (
    <Transition.Root as={Fragment} show={show}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="duration-400 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-400 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-black/40 fixed inset-0 transition-opacity"></div>
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="duration-400 ease-out"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="max-w-[600px] overflow-hidden relative rounded-lg transform transition-all w-full">
                <div className="bg-white flex flex-col h-full w-full">
                  <div className="border-b border-b-[#F1F5F9] border-solid flex items-center justify-between px-6 py-4">
                    <Dialog.Title className="font-semibold leading-7 text-[#1E293B] text-[18px]">
                      Log out
                    </Dialog.Title>
                    <Button
                      className="hover:bg-default-200 hover:rounded-full -mr-2 p-2"
                      hoverScale={1}
                      onClick={onClose}
                      tapScale={0.96}
                    >
                      <IconX color="#1E293B" size={20} />
                    </Button>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
