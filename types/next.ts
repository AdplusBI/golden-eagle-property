/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';

// For Next.js 15+ where params is a Promise
export type RouteParams = Promise<{ id: string }>;

// For route handlers with dynamic params
export type RouteContext = {
  params: RouteParams;
};

// Generic route handler type
export type RouteHandler<T = any> = (
  request: NextRequest,
  context: RouteContext
) => Promise<NextResponse<T>>;

// For routes without params
export type SimpleRouteHandler<T = any> = (
  request: NextRequest
) => Promise<NextResponse<T>>;