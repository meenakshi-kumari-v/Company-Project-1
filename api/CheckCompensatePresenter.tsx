import {apiGetMethod4} from '../../api';
import {  CheckCompensate} from '../../apiEndPoints';
import {  CheckCompensateView} from './AttendanceView';

export const CheckCompensateApi = (
  data: any,
  CheckCompensateView: CheckCompensateView,
) => {
  apiGetMethod4(CheckCompensate, data)
    .then((result: any) => {
      CheckCompensateView.CheckCompensateSuccess(result);
    })
    .catch(err => {
      CheckCompensateView.CheckCompensateFailure(err);
    });
};
