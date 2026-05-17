"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Sidebar from "./SideBar";
import QuestionSlider from "./QuestionSlider";
import EditModal from "./(layouts)/(layoutComponents)/EditModal";
import StepIndicator from "@/components/StepIndicator";
import { useQuestionnaireModalStore } from "@/store/useQuestionnaireModalStore";
import { useQuestionnaireResponseStore } from "@/store/useQuestionnaireResponseStore";
import { useGetMissingQuestions } from "@/hooks/questionnaire/useGetMissingQuestions";
import { useGetJobQuestions } from "@/hooks/questionnaire/useGetJobQuestions";
import { useGetAnchorQuestions } from "@/hooks/questionnaire/useGetAnchorQuestions";
import { usePostMissingQuestionResponse } from "@/hooks/questionnaire/usePostMissingQuestionResponse";
import { usePostJobQuestionResponse } from "@/hooks/questionnaire/usePostJobQuestionResponse";
import { usePostAnchorQuestionResponse } from "@/hooks/questionnaire/usePostAnchorQuestionResponse";
import { PostAnswerResponse } from "@/services/questionnaire/postMissingQuestionResponse";
import Image from "next/image";
import { useCvFlowStore } from "@/store/useCvFlowStore";
import { useStepIndicatorStore } from "@/store/useStepIndicatorStore";

interface QuestionnairePageProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

export default function QuestionnairePage({
  setCurrentScreen,
}: QuestionnairePageProps) {
  const withCv = useCvFlowStore((state) => state.withCv);
  const setReferenceId = useCvFlowStore((state) => state.setReferenceId);

  const isModalOpen = useQuestionnaireModalStore((state) => state.isModalOpen),
    closeModal = useQuestionnaireModalStore((state) => state.closeModal);

  const setStep = useQuestionnaireResponseStore((state) => state.setStep);
  const responseArray = useQuestionnaireResponseStore(
    (state) => state.responseArray
  );
  const getAnswer = useQuestionnaireResponseStore((state) => state.getAnswer);
  const setCompletedStepIndex = useStepIndicatorStore(
    (state) => state.setCompletedStepIndex
  );
  const [submitted, setSubmitted] = useState("");
  const lastAutoSkipKeyRef = useRef<string | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [anchorType, setAnchorType] = useState<string>("parameters");

  const { data: missingQuestions, isFetching: isMissingPending } =
    useGetMissingQuestions(withCv);

  const { data: jobQuestions, isFetching: isJobPending } = useGetJobQuestions(
    withCv,
    {
      enabled: submitted === "missing", //fetch job questions only after missing questions are submitted
    }
  );

  const { data: anchorQuestions, isFetching: isAnchorPending } =
    useGetAnchorQuestions(withCv, anchorType);

  const { mutate: postMissingAnswers, isPending: isMissingAnswersPending } =
    usePostMissingQuestionResponse({
      onSuccess: () => setSubmitted("missing"), //set flag to fetch job questions
    });

  const { mutate: postJobAnswers } = usePostJobQuestionResponse();

  const { mutate: postAnchorAnswers, isPending: isRemainingPending } =
    usePostAnchorQuestionResponse({
      //change type to remaining after first submission
      //if type is remaining, set screen to summary
      onSuccess: (data: PostAnswerResponse) => {
        if (anchorType === "parameters") {
          setAnchorType("remaining");
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setCurrentScreen("summary");
        }
        if (data.doc_id) setReferenceId(data.doc_id);
      },
    });

  const steps = useMemo(
    () => [
      {
        title: "Missing Entries",
        totalQuestions: missingQuestions?.questions.length,
        questions: missingQuestions?.questions,
      },
      {
        title: "Talent Attributes",
        totalQuestions: jobQuestions?.questions.length,
        questions: jobQuestions?.questions,
      },
      {
        title: "Persona Attributes",
        totalQuestions: anchorQuestions?.questions.length,
        questions: anchorQuestions?.questions,
      },
    ],
    [missingQuestions, jobQuestions, anchorQuestions]
  );

  // Set initial step when component mounts or step changes
  useEffect(() => {
    setStep(steps[currentStep].title);
  }, [currentStep, setStep, steps]);

  const questions = steps[currentStep].questions;
  const currentStepAnswers = getAnswer(steps[currentStep].title);
  const currentQuestionCount = questions?.length ?? 0;

  const isLastStep =
    questions &&
    currentStep === steps.length - 1 && // user is on the final step
    anchorType === "remaining" &&
    !isAnchorPending && //if fetching anchor questions
    !isRemainingPending && // if submitting anchor answers
    currentQuestion === questions.length - 1; // user is on the final question of that step

  const buttonText = isLastStep
    ? "Finish"
    : isRemainingPending || isAnchorPending //show loading while submitting first anchor answers and fetching the remaining anchor questions
      ? "Loading"
      : "Next";

  // Auto-skip sections that return zero questions so the flow doesn't appear stuck.
  useEffect(() => {
    const isAnyPending =
      isMissingPending ||
      isJobPending ||
      isAnchorPending ||
      isMissingAnswersPending ||
      isRemainingPending;

    if (isAnyPending) return;
    if (currentQuestionCount > 0) return;

    const autoSkipKey = `${currentStep}-${anchorType}-${submitted}-${currentQuestionCount}`;
    if (lastAutoSkipKeyRef.current === autoSkipKey) return;
    lastAutoSkipKeyRef.current = autoSkipKey;

    if (currentStep === 0) {
      setSubmitted("missing");
      setStep(steps[1].title);
      setCurrentStep(1);
      setCurrentQuestion(0);
      return;
    }

    if (currentStep === 1) {
      setStep(steps[2].title);
      setCurrentStep(2);
      setCurrentQuestion(0);
      return;
    }

    // currentStep === 2
    if (anchorType === "parameters") {
      setAnchorType("remaining");
      setCurrentQuestion(0);
      return;
    }

    setCompletedStepIndex(2);
    setCurrentScreen("summary");
  }, [
    currentStep,
    anchorType,
    submitted,
    currentQuestionCount,
    isMissingPending,
    isJobPending,
    isAnchorPending,
    isMissingAnswersPending,
    isRemainingPending,
    setStep,
    steps,
    setCurrentScreen,
    setCompletedStepIndex,
  ]);

  const handleNext = () => {
    // Case 1: Move to the next question within the same step
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }

    // Case 2: End of questions in the current step → submit answers & move to next step
    else if (currentStep <= steps.length - 1) {
      if (currentStep === 0) {
        postMissingAnswers({
          withCv,
          answers: responseArray.get("Missing Entries") ?? [],
        });
      } else if (currentStep === 1)
        postJobAnswers({
          withCv,
          answers: responseArray.get("Talent Attributes") ?? [],
        });
      else {
        postAnchorAnswers({
          withCv,
          answers: responseArray.get("Persona Attributes") ?? [],
        });
        setCompletedStepIndex(2);
      }

      // If we are not already at the very last step,
      // advance to the next step and reset question index
      if (currentStep !== steps.length - 1) {
        setStep(steps[currentStep + 1].title); // update step title
        setCurrentStep(currentStep + 1); // move to next step
        setCurrentQuestion(0); // start from first question of that step
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentQuestion((steps[currentStep - 1].totalQuestions ?? 0) - 1);
    }
  };

  return (
    <div className='h-[calc(100vh-4.625rem)] flex gradient-bg overflow-x-hidden'>
      <Sidebar
        steps={steps}
        currentStep={currentStep}
        currentQuestion={currentQuestion}
        onStepChange={(step) => {
          setCurrentStep(step);
          setCurrentQuestion(0);
        }}
        onQuestionChange={setCurrentQuestion}
        setCurrentScreen={setCurrentScreen}
      />
      <div className='flex flex-col flex-1 w-full relative overflow-y-auto h-full'>
        <div className='absolute top-4 md:top-8 left-0 w-full px-4 md:px-0 z-10 flex justify-center'>
          <StepIndicator currentStep={2} setCurrentScreen={setCurrentScreen} />
        </div>

        {/**
         * Show loader if:
         * - missing/job/anchor questions are being fetched
         * - missing answers are being submitted
         *
         * Exception: If anchor type is parameters,
         * do not show loader (as this is a quick fetch after submitting the first set of answers)
         */}

        {isMissingPending ||
          isJobPending ||
          isAnchorPending ||
          isMissingAnswersPending ||
          isRemainingPending ? (
          <div className='flex-1 flex items-center justify-center'>
            <Image
              src={"/loader.svg"}
              alt='Loading...'
              width={60}
              height={60}
              className='animate-pulse'
            />
          </div>
        ) : (
          <QuestionSlider
            questions={questions}
            currentIndex={currentQuestion}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            buttonText={buttonText}
            existingAnswers={currentStepAnswers}
            currentStep={currentStep}
          />
        )}
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={closeModal}
      />
    </div>
  );
}
