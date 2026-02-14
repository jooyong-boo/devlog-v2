'use client';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Avatar } from '@/shared/ui/avatar';
import { Select } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import { Pagination } from '@/shared/ui/pagination';
import { useState } from 'react';

export default function DemoPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            FSD Architecture - Shared UI Components
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Phase 1 Complete: 9 Production-Ready Components with 66 Passing
            Tests
          </p>
        </div>

        {/* Buttons */}
        <Card
          variant="bordered"
          padding="lg"
          className="animate-slide-in-up stagger-delay-1"
        >
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" leftIcon={<span>←</span>}>
              Back
            </Button>
            <Button variant="primary" rightIcon={<span>→</span>}>
              Next
            </Button>
          </div>
        </Card>

        {/* Form Components */}
        <Card
          variant="bordered"
          padding="lg"
          className="animate-slide-in-up stagger-delay-2"
        >
          <h2 className="text-2xl font-bold mb-6">Form Components</h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="Username"
              placeholder="Enter your username"
              helperText="This will be your public display name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<span>@</span>}
              required
            />
            <Input
              label="With Error"
              error="This field is required"
              defaultValue="Invalid input"
            />
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              rows={4}
            />
            <Select label="Country">
              <option value="">Select a country</option>
              <option value="kr">South Korea</option>
              <option value="us">United States</option>
              <option value="jp">Japan</option>
            </Select>
          </div>
        </Card>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-up stagger-delay-3">
          <Card variant="default" padding="lg">
            <h3 className="text-xl font-bold mb-2">Default Card</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A simple card with default styling
            </p>
          </Card>
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold mb-2">Bordered Card</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A card with a visible border
            </p>
          </Card>
          <Card variant="elevated" padding="lg" hoverable>
            <h3 className="text-xl font-bold mb-2">Elevated & Hoverable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hover over this card to see the lift effect
            </p>
          </Card>
        </div>

        {/* Badges & Avatars */}
        <Card
          variant="bordered"
          padding="lg"
          className="animate-slide-in-up stagger-delay-4"
        >
          <h2 className="text-2xl font-bold mb-6">Badges & Avatars</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="primary" size="sm">
                  Small
                </Badge>
                <Badge variant="primary" size="lg">
                  Large
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Avatars</h3>
              <div className="flex gap-4 items-center">
                <Avatar alt="User 1" fallback="U1" size="sm" />
                <Avatar alt="User 2" fallback="U2" size="md" />
                <Avatar alt="User 3" fallback="U3" size="lg" />
                <Avatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt="John Doe"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Skeletons */}
        <Card variant="bordered" padding="lg">
          <h2 className="text-2xl font-bold mb-6">Loading Skeletons</h2>
          <div className="space-y-4">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <div className="flex gap-4 items-center">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="rectangular" height={20} />
                <Skeleton variant="rectangular" height={20} width="60%" />
              </div>
            </div>
          </div>
        </Card>

        {/* Pagination */}
        <Card variant="bordered" padding="lg">
          <h2 className="text-2xl font-bold mb-6">Pagination</h2>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <p className="text-center mt-4 text-gray-600">
            Current page: {currentPage}
          </p>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400 pt-8 border-t">
          <p className="mb-2">
            ✅ Phase 1 Complete: FSD Structure & Shared UI Components
          </p>
          <p className="text-sm">
            66 tests passing • 9 components • Full TypeScript support
          </p>
        </div>
      </div>
    </div>
  );
}
