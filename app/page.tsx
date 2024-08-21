"use client";

import { JOB } from "@/utils/constants";
import { parseDate } from "@internationalized/date";
import { FileInput } from "@mantine/core";
import { Button, Checkbox, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  cvFile: any;
  job: string;
  confirmPass: string;
  agreement: boolean;
}

export default function Home() {
  const { handleSubmit, register, reset, setValue, control, getValues, formState: {errors, isValid} } = useForm<IFormInput>({
    defaultValues: { email: "", password: "", confirmPass: "", name: "", agreement: false, dateOfBirth: "", gender: "male", cvFile: ""},
    mode: "onChange",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const onSubmitForm = (data: IFormInput) => {
    console.log(data)
    if (data?.confirmPass !== data?.password) {
      setShowAlert(true);
    } else {
      onOpen();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col gap-y-2"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <Input
          {...register("name", { required: "Name is required" })}
          label="Name"
          placeholder="Enter your name"
          type="text"
          isRequired
          errorMessage={errors?.name?.message}
          isInvalid={errors?.name ? true : false}
          onChange={(e) => setValue("name", e.target.value)}
        />
        <Input
          {...register("email", {
            required: "Email must be filled",
            pattern: /^[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/,
          })}
          label="Email"
          placeholder="Enter your email"
          type="text"
          isRequired
          errorMessage={errors?.email?.message}
          isInvalid={errors?.email ? true : false}
          onChange={(e) => setValue("email", e.target.value)}
        />
        <DatePicker isRequired label="Date of Birth" onChange={(e) => setValue("dateOfBirth", e?.toString() ?? "")} showMonthAndYearPickers />
        <div className="flex gap-x-2">
          <RadioGroup label="Select your gender" isRequired onValueChange={(value) => setValue("gender", value)} defaultValue={getValues("gender")}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </RadioGroup>
        </div>
        <Select isRequired label="Job" onChange={(e) => setValue("job", e.target.value)} placeholder="Select you job" items={JOB}>{(job: any) => (<SelectItem key={job.key}>{job.label}</SelectItem>)}</Select>
        {/* <FileInput label="Attach your CV" required error={<span className="text-red-500 text-md leading-5">{errors?.cvFile ? errors?.cvFile?.message : ""}</span>} onChange={(e) => setValue("cvFile", e)} placeholder="Your CV" withAsterisk /> */}
        <Input
          {...register("password", {
            required: "Password must be fill",
            pattern:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          })}
          label="Password"
          placeholder="Enter your Password"
          type="password"
          errorMessage={errors?.password?.message}
          isInvalid={errors?.password ? true : false}
          isRequired
        />
        <Input
          {...register("confirmPass", {
            required: "Confirm must be fill",
            pattern:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          })}
          label="Confirm Password"
          placeholder="Repeat your password"
          type="password"
          isRequired
          errorMessage={errors?.confirmPass?.message}
          isInvalid={errors?.confirmPass ? true : false}
        />
        <Checkbox isRequired onValueChange={(isSelected) => setValue("agreement", isSelected)}>Agreement</Checkbox>
        <Button type="submit">Submit</Button>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
        {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Isi Form Berhasil</ModalHeader>
              <ModalBody>
                <p>Anda bisa tutup pop up ini</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose();
                  reset();
                }}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
