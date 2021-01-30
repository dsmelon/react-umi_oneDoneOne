import { Effect, ImmerReducer, Subscription } from 'umi';

export interface ModelType {
  namespace: string;
  effects: {
    [key:string]:Effect;
  };
  state: {
    [key:string]:any;
  }
  reducers: {
    save: ImmerReducer;
  };
  subscriptions: { setup: Subscription };
}