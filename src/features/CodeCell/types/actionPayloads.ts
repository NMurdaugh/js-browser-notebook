export interface IBundleStartPayload {
  id: string;
}

export interface IBundleCompletePayload {
  id: string;
  bundle: {
    code: string;
    error: string;
  };
}

export interface ICreateBundlePayload {
  id: string;
  inputCode: string;
}
