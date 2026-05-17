"use client";

import React, { useEffect, useMemo, useState } from "react";
import UploadPage from "./(upload)/UploadPage";
import ExtractedInfo from "./(upload)/ExtractedInfo";
import QuestionnairePage from "./(questionnaire)/QuestionnairePage";
import Resume from "./Resume";
import NoResume from "./(upload)/NoResume";
import Summary from "./(summary)/Summary";

import JobTitlePage from "./(jobtitle)/JobTitlePage";
import SnapShotPage from "./(snapshot)/SnapShotPage";
import { CVResponse } from "@/services/cvParse/cvParseService";

const SCREEN_STORAGE_KEY = "create.currentScreen";
const ALLOWED_SCREENS = new Set([
  "upload",
  "extracted-info",
  "questionnaire",
  "resume",
  "no-resume",
  "summary",
  "job-title",
  "snapshot",
]);

export default function CreateSnap() {
  const [currentScreen, setCurrentScreen] = useState<string>("upload");
  const [extractedInfo, setExtractedInfo] = useState<CVResponse | undefined>();

  const setAndPersistScreen: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    const screen = typeof value === "function" ? value(currentScreen) : value;
    const next = ALLOWED_SCREENS.has(screen) ? screen : "upload";
    setCurrentScreen(next);
    try {
      sessionStorage.setItem(SCREEN_STORAGE_KEY, next);
    } catch {
      // ignore storage failures (e.g., disabled storage)
    }
  };

  const resolvedScreen = useMemo(() => {
    // If extracted-info is restored but we don't have data anymore (refresh),
    // fall back to upload instead of rendering a broken screen.
    if (currentScreen === "extracted-info" && !extractedInfo) return "upload";
    // Keep users on the restored screen after refresh. Individual screens
    // already handle missing data states gracefully.
    return currentScreen;
  }, [currentScreen, extractedInfo]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SCREEN_STORAGE_KEY);
      if (stored && ALLOWED_SCREENS.has(stored)) {
        setCurrentScreen(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <React.Fragment>
      {resolvedScreen === "upload" && (
        <UploadPage
          setCurrentScreen={setAndPersistScreen}
          setExtractedInfo={setExtractedInfo}
        />
      )}

      {resolvedScreen === "extracted-info" && (
        <ExtractedInfo
          setCurrentScreen={setAndPersistScreen}
          extractedInfo={extractedInfo}
        />
      )}

      {resolvedScreen === "questionnaire" && (
        <QuestionnairePage setCurrentScreen={setAndPersistScreen} />
      )}

      {resolvedScreen === "resume" && (
        <Resume setCurrentScreen={setAndPersistScreen} />
      )}

      {resolvedScreen === "no-resume" && (
        <NoResume setCurrentScreen={setAndPersistScreen} />
      )}
      {resolvedScreen === "summary" && (
        <Summary setCurrentScreen={setAndPersistScreen} />
      )}
      {resolvedScreen === "job-title" && (
        <JobTitlePage setCurrentScreen={setAndPersistScreen} />
      )}
      {resolvedScreen === "snapshot" && (
        <SnapShotPage setCurrentScreen={setAndPersistScreen} />
      )}
    </React.Fragment>
  );
}
