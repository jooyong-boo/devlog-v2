'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card } from '@/shared/ui/card';

interface Project {
  id: number;
  name: string;
  desc: string;
  sort: number;
  _count: { posts: number };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const fetchProjects = async () => {
    const res = await fetch('/api/admin/projects');
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), desc: desc.trim() }),
    });

    if (res.ok) {
      setName('');
      setDesc('');
      fetchProjects();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProjects();
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDesc(project.desc);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDesc('');
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim(), desc: editDesc.trim() }),
    });

    if (res.ok) {
      setEditingId(null);
      fetchProjects();
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">프로젝트 관리</h1>

      <Card variant="bordered" padding="lg" className="mb-8">
        <h2 className="text-lg font-semibold mb-4">새 프로젝트 추가</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="프로젝트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름을 입력하세요"
            required
          />
          <Input
            label="설명"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="프로젝트에 대한 간단한 설명"
            required
          />
          <Button type="submit">추가</Button>
        </form>
      </Card>

      {loading ? (
        <p className="text-gray-500">불러오는 중...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} variant="bordered" padding="md">
              {editingId === project.id ? (
                <div className="space-y-3">
                  <Input
                    label="프로젝트 이름"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <Input
                    label="설명"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(project.id)}>
                      저장
                    </Button>
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {project._count.posts}개의 글
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(project)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
