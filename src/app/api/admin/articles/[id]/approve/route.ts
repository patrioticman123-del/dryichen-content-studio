import { NextResponse } from 'next/server';
import { approveArticle, getArticle } from '@/features/content-admin/repository';
import { runApprovalChecks } from '@/features/content-admin/scoring';

export const runtime = 'nodejs';
export async function POST(_request: Request, { params }: { params: { id: string } }) { const article = await getArticle(params.id); if (!article) return NextResponse.json({ success: false, error: '找不到文章。' }, { status: 404 }); const version = article.versions.find((item) => item.version === article.currentVersion) || article.versions[0]; const checks = runApprovalChecks(version); if (checks.some((check) => check.blocking && !check.passed)) return NextResponse.json({ success: false, error: '仍有未通過的必要檢查。', checks }, { status: 422 }); return NextResponse.json({ success: true, article: await approveArticle(params.id), checks }); }
