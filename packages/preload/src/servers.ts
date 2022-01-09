import { resolve } from 'path';
import { exec } from 'child_process';
import { URL } from 'url';

export interface LaunchServerOptions {
  address: string;
  nickname: string;
  onError?: (code: number | null) => void;
  onSuccess?: () => void;
  onClose?: (code?: number | null, signal?: NodeJS.Signals | null) => void;
}

const validators = {
  fail(name: string, value: string) {
    throw new Error(`Invalid argument [${name}] got "${value}"`);
  },

  address(str: string) {
    try {
      new URL(str);
      return encodeURI(str);
    } catch (error) {
      this.fail('address', str);
    }
  },

  nickname(str: string, limit = 12) {
    if (typeof str !== 'string' || str.length < 3) {
      this.fail('nickname', str);
    }
    return str.substring(0, limit);
  },
};

export const launchServer = (address: string, nickname: string) => {
  const filePath = import.meta.env.DEV
    ? resolve(process.cwd(), 'bin/gclient.exe')
    : resolve(process.resourcesPath, 'bin/gclient.exe');

  return exec(
    `start "Window title" ${filePath} --address=${validators.address(
      address
    )} --nickname=${validators.nickname(nickname)}`,
    { cwd: process.cwd() },
    (err) => {
      if (err) throw err;
    }
  );
};

export default {
  launch({ address, nickname, onSuccess, onClose }: LaunchServerOptions): void {
    const process = launchServer(address, nickname);
    if (onSuccess) onSuccess();
    if (onClose) process.once('close', onClose);
  },
};
