class IError extends Error {
  public constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, IError.prototype);
  }
}

export { IError };
