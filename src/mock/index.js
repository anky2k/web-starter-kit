import { Server } from 'miragejs';
import { mockDataBase } from './seeds';
import {
  postSendOtp, postVerifyOtp, postLogin, postVerifyToken, postRefreshToken, postCheckAuth
} from './req-handlers/registration';

import { isMockMode } from '../config';

function mockServer(environment = 'development', callback) {
  const server = new Server({
    environment,
    seeds(server) {
      server.db.loadData(mockDataBase);
      callback();
    },
    routes() {
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/send-otp', postSendOtp)
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/verify-otp', postVerifyOtp)
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/login', postLogin)
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/verify-token', postVerifyToken)
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/refresh-token', postRefreshToken)
      this.post('https://jn0yuqca5m.execute-api.ap-southeast-1.amazonaws.com/check-auth', postCheckAuth)

      // bypass from mock
      this.passthrough('/success');
    }
  });
  return server;
}

function loadMockServerOnce() {
  let initializeMockServer = true;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async () => {
    if (isMockMode() && initializeMockServer) {
      const { default: mockServer } = await import('../mock');
      mockServer('development', channel.resolve);
      initializeMockServer = false;
    } else {
      channel.resolve();
    }
    return channel.waitOn;
  };
}

export const loadMockServer = loadMockServerOnce();

export default mockServer;
