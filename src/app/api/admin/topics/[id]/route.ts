import { NextResponse } from 'next/server';
import { updateTopicStatus } from '@/features/content-admin/repository';
import type { TopicStatus } from '@/features/content-admin/types';

const allowedStatuses: TopicStatus[] = ['new', 'saved', 'dismissed', 'generating', 'drafting'];
export const runtime = 'nodejs';
export async function PATCH(request: Request, { params }: { params: { id: string } }) { const body = await request.json().catch(() => ({})) as { status?: TopicStatus }; if (!body.status || !allowedStatuses.includes(body.status)) return NextResponse.json({ success: false, error: '狀態不正確。' }, { status: 400 }); const topic = await updateTopicStatus(params.id, body.status); if (!topic) return NextResponse.json({ success: false, error: '找不到議題。' }, { status: 404 }); return NextResponse.json({ success: true, topic }); }
