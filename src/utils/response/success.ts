import _isObjectLike from 'lodash/isObjectLike'

export class SuccessResponse {
    public result: any
    public meta: any

    public constructor(result: any, meta = {}) {
        this.result =
            _isObjectLike(result) || result === null
                ? result
                : {}
        this.meta = meta
    }
}
