"use client";

import { Avatar } from "@mantine/core";
import { IconMoodSmile, IconPaperclip } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./cores/Button";

export const Messenger = () => {
  const { getInputProps, getRootProps } = useDropzone();

  return (
    <div className="border-l border-l-[#E2E8F0] border-solid bg-white flex flex-col gap-y-4 p-4 rounded-r-2xl w-2/5 sm:rounded-2xl sm:w-full md:rounded-2xl md:w-full">
      <span className="font-semibold text-[16px]">Esther Howard</span>
      <div className="flex gap-x-2 items-center justify-end">
        <div className="bg-[#6B6EFF] px-2 py-1 rounded-bl-lg rounded-t-lg">
          <span className="font-normal text-[12px] text-white">
            Are you ready?
          </span>
        </div>
        <Avatar color="cyan" radius="xl">
          W
        </Avatar>
      </div>
      <div className="flex gap-x-2 items-center">
        <Avatar color="cyan" radius="xl">
          R
        </Avatar>
        <div className="bg-[#E5E5E5] px-2 py-1 rounded-br-lg rounded-t-lg">
          <span className="font-normal text-[12px]">
            I have prepared everything
          </span>
        </div>
      </div>
      <div className="bg-[#E2E8F0] flex flex-col gap-y-2 p-2 rounded-lg">
        <textarea
          className="bg-[#E2E8F0] outline-none p-1"
          placeholder="Type your message"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <Button
              className="hover:bg-[#E2E8F0] p-1 rounded-full"
              hoverScale={1}
              onClick={() => {}}
              tapScale={0.96}
              type="button"
            >
              <IconMoodSmile size={20} />
            </Button>
            <button
              {...getRootProps()}
              className="hover:bg-[#E2E8F0] p-1 rounded-full"
              type="button"
            >
              <input {...getInputProps()} />
              <IconPaperclip size={20} />
            </button>
          </div>
          <Button
            className="bg-[#6B6EFF] flex hover:opacity-50 items-center justify-center px-3 py-1 rounded-lg text-white"
            hoverScale={1}
            onClick={() => {}}
            tapScale={0.96}
            type="button"
          >
            Send now
          </Button>
        </div>
      </div>
    </div>
  );
};
