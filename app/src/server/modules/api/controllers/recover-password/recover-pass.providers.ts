import { RecoverPassEntity } from './recover-pass.entity';

export const recoverPassProviders = [
  {
    provide: 'RecoverPassRepository',
    useValue: RecoverPassEntity
  },
];
