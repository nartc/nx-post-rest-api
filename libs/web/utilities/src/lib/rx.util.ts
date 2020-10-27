import {
  ApiResponse,
  FailureApiResponse,
  SuccessApiResponse,
} from '@post-rest-web/types';
import {
  isObservable,
  Observable,
  of,
  pipe,
  throwError,
  UnaryFunction,
} from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export class RxUtil {
  static toApiResponse<TData>(
    initialValue: TData = null,
    errObsFactoryOrRethrow?:
      | true
      | ((err: unknown) => string | Observable<string>)
  ): UnaryFunction<Observable<TData>, Observable<ApiResponse<TData>>> {
    return pipe(
      map<TData, SuccessApiResponse<TData>>((data) => ({
        status: 'success' as const,
        data,
        error: '',
      })),
      startWith({ status: 'loading' as const, data: initialValue, error: '' }),
      catchError((err) => {
        const defaultFailureResponse = {
          status: 'failure' as const,
          data: initialValue,
        };

        if (errObsFactoryOrRethrow == null) {
          return of<FailureApiResponse<TData>>({
            ...defaultFailureResponse,
            error: err.message || err.error || err.toString(),
          });
        }

        if (typeof errObsFactoryOrRethrow === 'function') {
          const error = errObsFactoryOrRethrow(err);
          if (isObservable(error)) {
            return error.pipe(
              map<string, FailureApiResponse<TData>>((e) => ({
                ...defaultFailureResponse,
                error: e,
              }))
            );
          }

          return of<FailureApiResponse<TData>>({
            ...defaultFailureResponse,
            error,
          });
        }

        return throwError(err);
      })
    );
  }
}
