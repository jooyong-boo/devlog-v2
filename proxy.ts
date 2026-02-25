import type { NextFetchEvent, NextRequest } from 'next/server';
import { auth } from './auth';

const authProxy = auth((_request, _event: NextFetchEvent) => undefined);

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return authProxy(request, event);
}

export default proxy;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
