export class AjaxResult {
  readonly code: number
  readonly msg: string;
  [key: string]: any

  constructor(code, msg, data) {
    this.code = code
    this.msg = msg
    Object.assign(this, data)
  }

  static success(data?: any, msg = 'Ok') {
    return new AjaxResult(200, msg, data)
  }

  static error(msg = 'Fail', code = 500) {
    return new AjaxResult(code, msg, null)
  }
}
