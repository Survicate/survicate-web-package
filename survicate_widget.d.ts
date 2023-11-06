declare const Survicate: {
  init: (config: { workspaceKey: string }) => Promise<null | void>;
  addEventListener: (
    event: SurvicateApiEvent,
    callback: SurvicateCallbackTypes
  ) => number | void;
  destroyVisitor: (callback?: () => void) => void;
  disableTargeting?: boolean;
  getSurvey: () => { id: string | null; name: string | null };
  getVisitorId: () => string;
  removeEventListener: (eventId: number | SurvicateApiEvent) => void;
  retarget: () => void;
  setVisitorTraits: (attributes: SurvicateVisitorAttributes) => void;
  showSurvey: (id: string, options: ShowSurveyOptions) => boolean;
  traits?: SurvicateVisitorAttributes;
};

export enum SurvicateApiEvent {
  questionAnswered = 'question_answered',
  surveyDisplayed = 'survey_displayed',
  surveyCompleted = 'survey_completed',
  surveyClosed = 'survey_closed',
}

type SurvicateCallbackType = (surveyId: string, answer?: unknown) => void;

type SurvicateQuestionAnsweredCallback = (
  surveyId: string,
  questionId: number,
  answer: unknown
) => void;

export type SurvicateCallbackTypes =
  | SurvicateCallbackType
  | SurvicateQuestionAnsweredCallback;

export interface SurvicateVisitorAttributes {
  [key: string]: string;
}

export interface ShowSurveyOptions {
  forceDisplay?: true;
  displayMethod?: SurvicateAppearMethod;
  displayOptions?: {
    delay?: number;
    scrolledPercentage?: number;
  };
}

export enum SurvicateAppearMethod {
  immediately = 'immediately',
  delayed = 'delayed',
  exitIntent = 'exitIntent',
  scroll = 'onScroll',
}

export default Survicate;
