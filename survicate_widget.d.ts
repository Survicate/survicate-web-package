type CallbackType = (surveyId: string, answer?: any) => void;

type QuestionAnsweredCallback = (surveyId: string, questionId: number, answer: any) => void;

type AttributeValue = string | number | boolean | Date;

interface VisitorAttributes {
  [key: string]: AttributeValue;
}

export type CallbackTypes = CallbackType | QuestionAnsweredCallback;

export interface ShowSurveyOptions {
  forceDisplay?: true;
  displayMethod?: AppearMethodApi;
  displayOptions?: {
    delay?: number;
    scrolledPercentage?: number;
  };
}

export enum AppearMethodApi {
  immediately = 'immediately',
  delayed = 'delayed',
  exitIntent = 'exitIntent',
  scroll = 'onScroll',
}

export enum ApiEvents {
  questionAnswered = 'question_answered',
  surveyDisplayed = 'survey_displayed',
  surveyCompleted = 'survey_completed',
  surveyClosed = 'survey_closed',
}

declare const Survicate: {
  ApiEvent: typeof ApiEvents;
  AppearMethod: typeof AppearMethodApi;
  addEventListener: (event: ApiEvents, callback: CallbackTypes) => number | void;
  destroyVisitor: (callback?: () => void) => void;
  disableTargeting?: boolean;
  getSurvey: () => { id: string | null; name: string | null };
  getVisitorId: () => string;
  init: (config: { workspaceKey: string }) => Promise<null | void>;
  invokeEvent: (eventName: string, eventProperties?: Record<string, string>) => void;
  removeEventListener: (eventId: number | ApiEvents) => void;
  retarget: () => void;
  setVisitorTraits: (attributes: VisitorAttributes) => void;
  showSurvey: (id: string, options: ShowSurveyOptions) => boolean;
  traits?: VisitorAttributes;
};

export default Survicate;
