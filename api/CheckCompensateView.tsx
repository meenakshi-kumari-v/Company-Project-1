export interface CheckCompensateView {
  CheckCompensateSuccess: (result: CheckCompensateView) => void;
  CheckCompensateFailure: (err: CheckCompensateView) => void;
}
