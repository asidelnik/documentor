import { SubmissionStatusEnum } from '../enums/SubmissionStatusEnum';

export interface IFormSubmissionResult {
  isShow: boolean;
  submissionStatus: SubmissionStatusEnum | undefined;
  message: string;
}
