import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/features/content-admin/auth-server';
import { listTopics } from '@/features/content-admin/repository';

export const runtime = 'nodejs';
export async function GET() { const denied = requireAdminApi(); if (denied) return denied; return NextResponse.json({ success: true, topics: await listTopics() }); }
