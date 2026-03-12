/**
 * @fileoverview Survicate JavaScript SDK Type Definitions
 *
 * This file contains TypeScript definitions for the Survicate JavaScript SDK,
 * which allows you to collect feedback from your website and web app users.
 * The SDK enables you to trigger surveys to understand your users
 * better and collect feedback about your product or service.
 *
 * @see https://developers.survicate.com/javascript/methods/
 */

/**
 * Callback function type for general survey events
 * @param surveyId - The unique identifier of the survey
 * @param answer - Optional answer data (for completion events)
 */
type CallbackType = (surveyId: string, answer?: any) => void;

/**
 * Callback function type for question answered events
 * @param surveyId - The unique identifier of the survey
 * @param questionId - The unique identifier of the question that was answered
 * @param answer - The answer data provided by the user
 */
type QuestionAnsweredCallback = (surveyId: string, questionId: number, answer: any) => void;

/**
 * Valid attribute value types that can be set for visitor traits
 * Please note that Date is serialized to ISO string
 */
type AttributeValue = string | number | boolean | Date;

/**
 * Interface for visitor attributes/traits
 * Allows setting custom properties for visitor identification and targeting
 */
interface VisitorAttributes {
  [key: string]: AttributeValue;
}

/**
 * Interface for response attributes
 * Response attributes are session-based and tied to survey responses
 */
interface ResponseAttribute {
  /** Name of the attribute */
  name: string;
  /** Provider of the attribute (optional) */
  provider?: string;
  /** Value of the attribute */
  value: AttributeValue;
}

/**
 * Union type for all possible callback types
 */
export type CallbackTypes = CallbackType | QuestionAnsweredCallback;

/**
 * Enumeration of available survey types in Survicate
 */
export enum SurveyType {
  /** Website or in-product surveys */
  WidgetSurvey = 'WidgetSurvey',
  /** Email or shareable link surveys */
  PageSurvey = 'PageSurvey',
  /** Mobile survey for mobile apps */
  MobileSurvey = 'MobileSurvey',
  /** Feedback button survey */
  FeedbackButton = 'FeedbackButton',
  /** Intercom integrated surveys */
  IntercomSurvey = 'IntercomSurvey',
}

/**
 * Options for controlling how a survey is displayed
 */
export interface ShowSurveyOptions {
  /** Force display the survey regardless of targeting rules */
  forceDisplay?: boolean;
  /** Method used to display the survey */
  displayMethod?: AppearMethodApi;
  /** Additional display configuration options */
  displayOptions?: {
    /** Delay in seconds before showing the survey */
    delay?: number;
    /** Percentage of page scrolled before showing the survey */
    scrolledPercentage?: number;
  };
}

/**
 * Available methods for survey appearance
 */
export enum AppearMethodApi {
  /** Show survey immediately */
  immediately = 'immediately',
  /** Show survey after a delay */
  delayed = 'delayed',
  /** Show survey on exit intent (when user tries to leave) */
  exitIntent = 'exitIntent',
  /** Show survey when user scrolls to a certain point */
  scroll = 'onScroll',
}

/**
 * Available API events that can be listened to
 */
export enum ApiEvents {
  /** Fired when a user answers a question */
  questionAnswered = 'question_answered',
  /** Fired when a survey is displayed to the user */
  surveyDisplayed = 'survey_displayed',
  /** Fired when a survey is completed */
  surveyCompleted = 'survey_completed',
  /** Fired when a survey is closed without completion */
  surveyClosed = 'survey_closed',
}

/**
 * Configuration model for initializing the Survicate SDK
 *
 * @example
 * ```javascript
 * const config = {
 *   workspaceKey: 'your-workspace-key',
 *   traits: { user_id: '123', plan: 'premium' },
 *   hiddenSurveys: ['survey-1', 'survey-2'],
 *   nonce: 'your-csp-nonce'
 * };
 * ```
 */
export interface ConfigModel {
  /** Disable targeting rules and show surveys to all visitors */
  disableTargeting?: true;
  /** Disable persistence of sensitive visitor data */
  disableSensitiveDataPersistence?: boolean;
  /** Force surveys to display in a specific language (IETF language tag, e.g., "en", "fr", "pt-BR") */
  forcedLanguage?: string;
  /** Force initial theme mode: "light", "dark", or "auto" (follow system). Same as setThemeMode() but applied on init */
  themeMode?: string;
  /** Array of survey IDs to hide from targeting */
  hiddenSurveys?: string[];
  /** Content Security Policy nonce for script injection */
  nonce?: string;
  /** Initial response traits/attributes to set (session-based) */
  responseTraits?: ResponseAttribute[];
  /** Initial visitor traits/attributes to set */
  traits?: VisitorAttributes;
  /** Your Survicate workspace key that can be found here https://panel.survicate.com/o/0/w/0/settings/access-keys*/
  workspaceKey: string;
}

/**
 * Available answer types for survey questions
 */
export enum SurveyQuestionAnswerType {
  /** Single choice question with radio buttons */
  single = 'single',
  /** Multiple choice question with checkboxes */
  multiple = 'multiple',
  /** Text input question for free-form responses */
  text = 'text',
  /** Smiley scale question */
  smileyScale = 'smiley_scale',
  /** Date question */
  date = 'date',
  /** Rating question (stars,hearts, thumbs up/down, etc.) */
  rating = 'rating',
  /** Dropdown list question */
  dropdown = 'dropdown_list',
  /** Matrix question for multiple related questions */
  matrix = 'matrix',
  /** Ranking question for ordering preferences */
  ranking = 'ranking',
  /** Numerical scale question (1-10, etc.) */
  numericalScale = 'numerical_scale',
  /** Customer satisfaction question */
  customerSatisfaction = 'csat',
}

/**
 * NPS (Net Promoter Score) answer type
 */
export enum SurveyNpsAnswerType {
  /** Net Promoter Score question */
  nps = 'nps',
}

/**
 * CTA (Call to Action) answer types
 */
export enum SurveyCtaAnswerType {
  /** Next button */
  button = 'button_next',
  /** Thank you message */
  thankYouMessage = 'empty',
  /** Link button */
  buttonLink = 'button_link',
  /** Close button */
  buttonClose = 'button_close',
  /** Redirect with timeout */
  redirect = 'redirect_timeout',
  /** Social media CTA */
  social = 'social_cta',
}

/**
 * Information about a survey point (question)
 */
export interface SurveyPointInfo {
  /** Unique identifier of the survey point */
  pointId: number;
  /** Type of answer expected for this point */
  answerType: SurveyQuestionAnswerType | SurveyNpsAnswerType | SurveyCtaAnswerType;
  /** Available answer options (for choice-based questions) */
  answers?: Array<{ id: number }>;
}

export interface SurveyApi {
  /**
   * Add an event listener for survey events
   * @param event - The event type to listen for
   * @param callback - Function to call when the event occurs
   * @returns Event listener ID for removal
   */
  addEventListener: (event: typeof ApiEvents, callback: CallbackTypes) => number | void;

  /**
   * Close the currently displayed survey (widget or feedback).
   * Fires the same close flow as when the user clicks the close button, including survey_closed event and integrations.
   * @param surveyId - Optional. If provided, only the survey with that ID is closed (if open).
   * If omitted, all open surveys are closed. Use survey ID for multiple widgets on one site.
   */
  closeSurvey: (surveyId?: string) => void;

  /**
   * Destroy the current visitor session and reset all data
   * @param callback - Optional callback to execute after destruction
   */
  destroyVisitor: (callback?: () => void) =>  Promise<void>;

  /** Disable targeting set in the Survicate panel */
  disableTargeting?: boolean;

  /** Whether sensitive data persistence is disabled */
  disableSensitiveDataPersistence?: boolean;

  /** Array of survey IDs to hide from targeting */
  hiddenSurveys?: string[];

  /**
   * Get the unique visitor ID for the specified survey type
   * @param surveyType - Optional survey type to get visitor ID for
   * @returns Unique visitor identifier
   */
  getVisitorId: (surveyType?: SurveyType) => string;

  /**
   * Get the response UUID for the current survey session
   *
   * This method returns the unique identifier for the current survey response.
   * When connectResponse is true:
   * - If an active survey exists with answers being collected, returns the survey's existing response UUID
   * - If no active survey exists, generates a new UUID (not stored)
   * When connectResponse is false or undefined, generates a new UUID each time.
   *
   * Note: The survey state response UUID is only available when there's already an active survey
   * with answers being collected. For programmatic submissions without an active survey,
   * you should generate a UUID once and reuse it across multiple submitAnswer calls.
   *
   * @example
   * ```javascript
   * // Safest way: Get response UUID after a question is answered (ensures active survey)
   * window._sva?.addEventListener('question_answered', function(surveyId, questionId) {
   *   if (surveyId === 'ab1791b79cacc6ba' && questionId === 1332422) {
   *     const responseUuid = window._sva?.getResponseUuid('WidgetSurvey', true);
   *
   *     window._sva?.submitAnswer(
   *       { surveyId: 'ab1791b79cacc6ba', pointId: 1332423, answer: 'this was submitted by API' },
   *       responseUuid
   *     );
   *   }
   * });
   * ```
   *
   * @param surveyType - The survey type (WidgetSurvey or FeedbackButton) to get the response UUID for
   * @param connectResponse - If true, returns existing response UUID from active survey, otherwise generates new UUID
   * @returns Response UUID string
   */
  getResponseUuid: (surveyType: SurveyType, connectResponse?: boolean) => string;

  /**
   * Get metadata about survey points (questions)
   *
   * This method returns information about all questions in a survey,
   * including their types and available answer options.
   *
   * @param surveyId - ID of the survey to get metadata for
   * @returns Array of survey point information or null if survey not found
   */
  getSurveyPointsMetadata: (surveyId: string) => SurveyPointInfo[] | null;

  /**
   * Invoke a custom event that can be used for targeting
   * @param eventName - Name of the custom event
   * @param eventProperties - Optional properties to attach to the event
   */
  invokeEvent: (eventName: string, eventProperties?: Record<string, string>) => void;

  /**
   * Remove an event listener
   * @param eventId - Event listener ID or event type to remove
   */
  removeEventListener: (eventId: number | typeof ApiEvents) => void;

  /**
   * Re-evaluate targeting rules and show surveys if conditions are met
   */
  retarget: () => void;

  /**
   * Set response traits/attributes that are tied to survey responses (session-based)
   * @param attributes - Array of response attribute objects with name, optional provider, and value
   */
  setResponseTraits: (attributes: ResponseAttribute[]) => void;

  /**
   * Force the survey language to a specific IETF language tag
   *
   * This method overrides all automatic language detection methods (URL parameters,
   * path segments, TLD, and browser language). The language will be applied to all
   * surveys until explicitly changed or cleared.
   *
   * The argument must be a valid IETF language tag such as:
   * - A two-letter ISO 639 code (e.g., "en", "fr")
   * - A three-letter code for languages without the two-letter equivalent (e.g., "haw", "yue")
   * - A language tag with region (e.g., "en-US", "pt-BR")
   *
   * @param languageTag - IETF language tag to force for all surveys
   *
   * @example
   * ```javascript
   * // Force surveys to display in French
   * Survicate.setSurveyLanguage('fr');
   *
   * // Force surveys to display in Brazilian Portuguese
   * Survicate.setSurveyLanguage('pt-BR');
   * ```
   */
  setSurveyLanguage: (languageTag: string) => void;

  /**
   * Set the theme mode for displaying surveys
   *
   * This method allows you to control whether surveys use light or dark theme.
   * The mode can be set to "light" or "dark" (case-insensitive).
   * Note: "auto" mode is not available via API and is the default behavior.
   *
   * @param mode - Theme mode: "light" or "dark" (case-insensitive)
   *
   * @example
   * ```javascript
   * // Force surveys to use light theme
   * Survicate.setThemeMode('light');
   *
   * // Force surveys to use dark theme
   * Survicate.setThemeMode('dark');
   * ```
   */
  setThemeMode: (mode: string) => void;

  /**
   * Set visitor traits/attributes for targeting and identification
   * @param attributes - Object containing visitor attributes
   */
  setVisitorTraits: (attributes: VisitorAttributes) => void;

  /**
   * Manually trigger a survey to be displayed
   * @param id - Survey ID to display
   * @param options - Display options for the survey
   * @returns Whether the survey was successfully triggered
   */
  showSurvey: (id: string, options: ShowSurveyOptions) => boolean;

  /**
   * Submit an answer to a survey question programmatically
   *
   * This method allows you to submit answers to the following survey questions:
   * Text, Single, Rating, Numerical, CSAT and NPS.
   * without user interaction, useful for integrations or testing.
   *
   * @param params - Object containing survey, point, and answer information
   * @param responseUuid - Optional response UUID to use for this answer submission.
   * If provided and valid, reuses the existing response UUID, otherwise generates a new one.
   * Useful when a survey is partially shown with some questions hidden, or when you want to
   * connect all answers into a single record in the analysis tab.
   */
  submitAnswer: (params: {
    /** Survey ID */
    surveyId: string;
    /** Question/point ID */
    pointId: number;
    /** Answer option ID (for single choice questions) */
    answerId?: number;
    /** Answer value (for text or numeric questions) */
    answer?: string | number;
  }, responseUuid?: string) => void;

  /** Current visitor traits/attributes */
  traits?: VisitorAttributes;
}

/**
 * Global Survicate object providing access to all SDK functionality
 *
 * This is the main entry point for the Survicate JavaScript SDK.
 * It provides methods for initializing the SDK, managing surveys,
 * handling visitor data, and responding to survey events.
 */
declare const Survicate: {
  /** Enumeration of available API events */
  ApiEvent: typeof ApiEvents;

  /** Enumeration of available appear methods */
  AppearMethod: typeof AppearMethodApi;

  /**
   * Add an event listener for survey events
   *
   * Listen for events like survey display, completion, question answers, etc.
   *
   * @example
   * ```javascript
   * Survicate.addEventListener(Survicate.ApiEvent.surveyCompleted, (surveyId) => {
   *   console.log(`Survey ${surveyId} was completed`);
   * });
   * ```
   *
   * @param event - The event type to listen for
   * @param callback - Function to call when the event occurs
   * @returns Event listener ID for removal
   */
  addEventListener: (event: ApiEvents, callback: CallbackTypes) => number | void;

  /**
   * Destroy the current visitor session and reset all data
   *
   * This method clears all visitor data, resets the visit counter,
   * and reinitializes the visitor with a new session. Useful for
   * testing or when you want to start fresh with a new visitor.
   *
   * @param callback - Optional callback to execute after destruction
   */
  destroyVisitor: (callback?: () => void) =>  Promise<void>;

  /** Disable targeting set in the Survicate panel */
  disableTargeting?: boolean;

  /**
   * Get the unique visitor ID for the specified survey type
   *
   * Each visitor gets a unique identifier that persists across sessions.
   * This ID is used for tracking visitor behavior and ensuring survey targeting.
   *
   * @param surveyType - Optional survey type (Widget or Feedback Button) to get visitor ID for
   * @returns Unique visitor identifier
   */
  getVisitorId: (surveyType?: SurveyType) => string;

  /**
   * Get the response UUID for the current survey session
   *
   * This method returns the unique identifier for the current survey response.
   * When connectResponse is true:
   * - If an active survey exists with answers being collected, returns the survey's existing response UUID
   * - If no active survey exists, generates a new UUID (not stored)
   * When connectResponse is false or undefined, generates a new UUID each time.
   *
   * Note: The survey state response UUID is only available when there's already an active survey
   * with answers being collected. For programmatic submissions without an active survey,
   * you should generate a UUID once and reuse it across multiple submitAnswer calls.
   *
   * @example
   * ```javascript
   * // Safest way: Get response UUID after a question is answered (ensures active survey)
   * Survicate.addEventListener('question_answered', function(surveyId, questionId) {
   *   if (surveyId === 'ab1791b79cacc6ba' && questionId === 1332422) {
   *     const responseUuid = Survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey, true);
   *     Survicate.submitAnswer(
   *       { surveyId: 'ab1791b79cacc6ba', pointId: 1332423, answer: 'this was submitted by API' },
   *       responseUuid
   *     );
   *   }
   * });
   *
   * // Alternative: Get a new response UUID (generates new UUID each time)
   * const responseUuid = Survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey);
   *
   * // For programmatic submissions without active survey, generate UUID once and reuse it
   * const responseUuid = Survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey);
   * Survicate.submitAnswer({ surveyId: 'survey-1', pointId: 1, answerId: 5 }, responseUuid);
   * Survicate.submitAnswer({ surveyId: 'survey-1', pointId: 2, answerId: 3 }, responseUuid);
   * ```
   *
   * @param surveyType - The survey type (WidgetSurvey or FeedbackButton) to get the response UUID for
   * @param connectResponse - If true, returns existing response UUID from active survey, otherwise generates new UUID
   * @returns Response UUID string
   */
  getResponseUuid: (surveyType: SurveyType, connectResponse?: boolean) => string;

  /**
   * Initialize the Survicate SDK with configuration
   *
   * This method must be called before using any other SDK functionality.
   * It loads survey data, sets up event listeners, and prepares the SDK
   * for use.
   *
   * @example
   * ```javascript
   * await Survicate.init({
   *   workspaceKey: 'your-workspace-key',
   *   traits: { user_id: '123', plan: 'premium' }
   * });
   * ```
   *
   * @param config - Configuration object for the SDK
   * @returns Promise that resolves when initialization is complete
   */
  init: (config: ConfigModel) => Promise<void>;

  /**
   * Invoke a custom event that can be used for targeting
   *
   * Custom events can be used in survey targeting rules to show
   * surveys based on specific user actions or behaviors.
   *
   * @example
   * ```javascript
   * Survicate.invokeEvent('purchase_completed', {
   *   amount: '99.99',
   *   product: 'premium_plan'
   * });
   * ```
   *
   * @param eventName - Name of the custom event
   * @param eventProperties - Optional properties to attach to the event
   */
  invokeEvent: (eventName: string, eventProperties?: Record<string, string>) => void;

  /**
   * Remove an event listener
   *
   * Use this method to clean up event listeners when they're no longer needed.
   *
   * @param eventId - Event listener ID or event type to remove
   */
  removeEventListener: (eventId: number | ApiEvents) => void;

  /**
   * Re-evaluate targeting rules and show surveys if conditions are met
   *
   * This method rechecks all targeting rules for available surveys
   * and displays them if the current visitor meets the criteria.
   * Useful after setting new visitor traits or invoking events.
   */
  retarget: () => void;

  /**
   * Set response traits/attributes that are tied to survey responses (session-based)
   *
   * Response traits are session-based attributes that are included in survey
   * answer payloads. Unlike visitor traits, they are stored in sessionStorage
   * and cleared when the session ends.
   *
   * @example
   * ```javascript
   * Survicate.setResponseTraits([
   *   { name: 'campaign_id', provider: 'static', value: 'summer-2024' },
   *   { name: 'page_type', value: 'checkout' }, // provider is optional
   *   { name: 'referrer', provider: 'static', value: 'google' }
   * ]);
   * ```
   *
   * @param attributes - Array of response attribute objects with name, optional provider, and value
   */
  setResponseTraits: (attributes: ResponseAttribute[]) => void;

  /**
   * Force the survey language to a specific IETF language tag
   *
   * This method overrides all automatic language detection methods (URL parameters,
   * path segments, TLD, and browser language). The language will be applied to all
   * surveys until explicitly changed or cleared.
   *
   * The argument must be a valid IETF language tag such as:
   * - A two-letter ISO 639 code (e.g., "en", "fr")
   * - A three-letter code for languages without the two-letter equivalent (e.g., "haw", "yue")
   * - A language tag with region (e.g., "en-US", "pt-BR")
   *
   * @example
   * ```javascript
   * // Force surveys to display in French
   * Survicate.setSurveyLanguage('fr');
   *
   * // Force surveys to display in Brazilian Portuguese
   * Survicate.setSurveyLanguage('pt-BR');
   * ```
   *
   * @param languageTag - IETF language tag to force for all surveys
   */
  setSurveyLanguage: (languageTag: string) => void;

  /**
   * Set the theme mode for displaying surveys
   *
   * This method allows you to control whether surveys use light or dark theme.
   * The mode can be set to "light" or "dark" (case-insensitive).
   * Note: "auto" mode is not available via API and is the default behavior.
   *
   * @example
   * ```javascript
   * // Force surveys to use light theme
   * Survicate.setThemeMode('light');
   *
   * // Force surveys to use dark theme
   * Survicate.setThemeMode('dark');
   * ```
   *
   * @param mode - Theme mode: "light" or "dark" (case-insensitive)
   */
  setThemeMode: (mode: string) => void;

  /**
   * Set visitor traits/attributes for targeting and identification
   *
   * Visitor traits are used for survey targeting and can include for example
   * information like user ID, plan type, location, etc.
   *
   * @example
   * ```javascript
   * Survicate.setVisitorTraits({
   *   user_id: '12345',
   *   plan: 'premium',
   *   country: 'US',
   *   is_subscriber: true
   * });
   * ```
   *
   * @param attributes - Object containing visitor attributes
   */
  setVisitorTraits: (attributes: VisitorAttributes) => void;

  /**
   * Manually trigger a survey to be displayed
   *
   * This method allows you to programmatically show a specific survey,
   * bypassing normal targeting rules if forceDisplay is set to true.
   *
   * @example
   * ```javascript
   * // Show survey immediately
   * Survicate.showSurvey('survey-123', {
   *   forceDisplay: true,
   *   displayMethod: Survicate.AppearMethod.immediately
   * });
   *
   * // Show survey after 5 seconds
   * Survicate.showSurvey('survey-123', {
   *   displayMethod: Survicate.AppearMethod.delayed,
   *   displayOptions: { delay: 5000 }
   * });
   * ```
   *
   * @param id - Survey ID to display
   * @param options - Display options for the survey
   * @returns Whether the survey was successfully triggered
   */
  showSurvey: (id: string, options: ShowSurveyOptions) => boolean;

  /**
   * Submit an answer to a survey question programmatically
   *
   * This method allows you to submit answers to the following survey questions:
   * Text, Single, Rating, Numerical, CSAT and NPS.
   * without user interaction, useful for integrations or testing.
   *
   * @param params - Object containing survey, point, and answer information
   * @param responseUuid - Optional response UUID to use for this answer submission.
   * If provided and valid, reuses the existing response UUID, otherwise generates a new one.
   * Useful when a survey is partially shown with some questions hidden, or when you want to
   * connect all answers into a single record in the analysis tab.
   */
  submitAnswer: (params: {
    /** Survey ID */
    surveyId: string;
    /** Question/point ID */
    pointId: number;
    /** Answer option ID (for single choice questions) */
    answerId?: number;
    /** Answer value (for text or numeric questions) */
    answer?: string | number;
  }, responseUuid?: string) => void;

  /**
   * Get metadata about survey points (questions)
   *
   * This method returns information about all questions in a survey,
   * including their types and available answer options.
   *
   * @param surveyId - ID of the survey to get metadata for
   * @returns Array of survey point information or null if survey not found
   */
  getSurveyPointsMetadata: (surveyId: string) => SurveyPointInfo[] | null;

  /** Current visitor traits/attributes */
  traits?: VisitorAttributes;
};

export default Survicate;
