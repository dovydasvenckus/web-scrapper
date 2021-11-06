import StepType from "./StepType";
interface Step {
  type?: StepType,
  fieldName: string,
  attributeName?: string,
  selector: string;
}

export default Step;