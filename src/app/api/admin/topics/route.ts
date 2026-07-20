import { NextResponse } from 'next/server';
import { listTopics } from '@/features/content-admin/repository';

export const runtime = 'nodejs';
export async function GET() { return NextResponse.json({ success: true, topics: await listTopics() }); }
