import { useQuestionnaireModalStore } from "@/store/useQuestionnaireModalStore";
import { useQuestionnaireResponseStore } from "@/store/useQuestionnaireResponseStore";
import { AccentButton } from "@/components/CustomButton";
import Image from "next/image";
import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditModal = ({ isOpen, onClose, onSave }: EditModalProps) => {
  const setResponse = useQuestionnaireResponseStore(
    (state) => state.setResponse
  );

  const title = useQuestionnaireModalStore((state) => state.title),
    setTitle = useQuestionnaireModalStore((state) => state.setTitle),
    experience = useQuestionnaireModalStore((state) => state.experience),
    setExperience = useQuestionnaireModalStore((state) => state.setExperience),
    question = useQuestionnaireModalStore((state) => state.question);

  if (!isOpen) return null;

  const handleSave = () => {
    setResponse({
      value: { title, experience },
      parameter: question,
      answer_type: "list",
    });
    onSave();
  };

  return (
    <div className='fixed inset-0 bg-black/80 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-xl shadow-md w-full max-w-md'>
        <div className='flex justify-between items-center p-4 border-b border-b-light-grey/30'>
          <p className='text-title-black font-medium'>Edit details</p>
          <button onClick={onClose} className='cursor-pointer'>
            <Image src='/icons/close.svg' alt='' width={20} height={20} />
          </button>
        </div>

        <div className='p-4'>
          <div className='text-center mb-6 space-y-1'>
            <Image
              src='/icons/SuitcaseSimple.svg'
              alt=''
              width={40}
              height={40}
              className='block m-auto bg-indigo-100 p-2 rounded-lg'
            />
            <h3 className='text-lg font-semibold text-title-black'>
              Edit your Job Overview
            </h3>
            <p className='text-sm text-grey'>
              Update your years of Job Overview
            </p>
          </div>
          <div className='space-y-6'>
            <div>
              <p className='font-medium text-sm text-title-black'>
                Enter your Place of experience
              </p>
              <input
                type='text'
                value={title}
                placeholder='Enter your Place of experience'
                onChange={(e) => setTitle(e.target.value)}
                className='w-full border border-gray-200 rounded-lg px-4 py-2 text-sm'
              />
            </div>

            <div>
              <p className='font-medium text-sm text-title-black'>
                Enter the number of months/years experience for it .
              </p>
              <input
                type='text'
                value={experience}
                placeholder='Enter the number of months/years experience for it'
                onChange={(e) => setExperience(e.target.value)}
                className='w-full border border-gray-200 rounded-lg px-4 py-2 text-sm'
              />
            </div>

            <AccentButton text='Save Changes' action={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
