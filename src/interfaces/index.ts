export interface Parameters {
  type: string;
  name: string;
  inputs: {
    type: string;
    value: string;
    name?: string;
  }[];
}
