declare const Survicate: {
  init: (config: { workspaceKey: string }) => Promise<null | void>;
  load: () => void;
  addEventListener: (
    event: SurvicateApiEvents,
    callback: SurvicateCallbackTypes
  ) => void;
  destroyVisitor: (callback?: () => void) => void;
  disableTargeting?: boolean;
  getState: () => SurvicateState;
  getSurvey: () => { id: string | null; name: string | null };
  getVisitorId: () => string;
  removeEventListener: (eventId: number) => void;
  retarget: () => void;
  setVisitorTraits: (attributes: SurvicateVisitorAttributes) => void;
  showSurvey: (id: string, options: ShowSurveyOptions) => void;
  traits?: SurvicateVisitorAttributes;
};

export enum SurvicateApiEvents {
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

type WindowWithSvd = Window & {
  _svd: unknown;
};

export interface SurvicateState {
  backendData: unknown;
  backendService: unknown | null;
  isKioskMode: boolean;
  isPreview: boolean;
  previewDevice: unknown;
  sampledSurveys: unknown | null;
  storageService: unknown | null;
  surveyApiState: unknown;
  surveyState: SurvicateSurveyState;
  tabId: number;
  update: WindowWithSvd | Record<string, unknown>;
  visit: unknown;
  visitor: unknown;
}

export interface SurvicateSurveyState {
  survey: unknown | null;
  theme: unknown | null;
  pointsDisplayed: unknown[];
  pointsForward: unknown[];
  pointsAnswered: {
    [id: number]: boolean;
  };
  responseUuid: string;
  isMinimized: boolean;
  isOverlayActive: boolean;
  isFinished: boolean;
  isAlreadyAnswered: boolean;
  isAnsweredByEmail: boolean;
  triggeredPointPreview: number | null;
  forceDisplay?: boolean;
  translations: unknown | null;
  translationLanguage: string | null;
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
