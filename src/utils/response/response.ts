import _isObjectLike from 'lodash/isObjectLike'

export class Response {
    public data: any
    public meta: any

    public constructor(data: any, meta = {}) {
        this.data = _isObjectLike(data) ? data : {}
        this.meta = meta
    }
}
