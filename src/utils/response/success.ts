import _isObjectLike from 'lodash/isObjectLike'

export class SuccessResponse {
    public data: any
    public meta: any

    public constructor(data: any, meta = {}) {
        this.data =
            _isObjectLike(data) || data === null ? data : {}
        this.meta = meta
    }
}
