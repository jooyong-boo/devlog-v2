'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card } from '@/shared/ui/card';

interface Series {
  id: number;
  title: string;
  description: string | null;
  sort: number;
  _count: { posts: number };
}

export default function AdminSeriesPage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSeries = async () => {
    const res = await fetch('/api/admin/series');
    if (res.ok) {
      const data = await res.json();
      setSeriesList(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await fetch('/api/admin/series', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
      }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      fetchSeries();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const res = await fetch(`/api/admin/series/${id}`, { method: 'DELETE' });
    if (res.ok) fetchSeries();
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">시리즈 관리</h1>

      <Card variant="bordered" padding="lg" className="mb-8">
        <h2 className="text-lg font-semibold mb-4">새 시리즈 추가</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="시리즈 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="시리즈 제목을 입력하세요"
            required
          />
          <Input
            label="설명 (선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="시리즈에 대한 간단한 설명"
          />
          <Button type="submit">추가</Button>
        </form>
      </Card>

      {loading ? (
        <p className="text-gray-500">불러오는 중...</p>
      ) : seriesList.length === 0 ? (
        <p className="text-gray-500">등록된 시리즈가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {seriesList.map((series) => (
            <Card key={series.id} variant="bordered" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{series.title}</h3>
                  {series.description && (
                    <p className="text-sm text-gray-500">
                      {series.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {series._count.posts}개의 글
                  </p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(series.id)}
                >
                  삭제
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
