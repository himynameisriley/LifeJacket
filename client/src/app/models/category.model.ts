import { Step } from './step.model';

export class Category {
  sequenceNumber: number;
  pending: boolean;
  complete: boolean;
  name: string;
  steps: Step[];
  fixedName: string;
}