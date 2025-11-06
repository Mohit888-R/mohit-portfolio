'use client';

import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { siteData } from '../data';

type ContentEdits = {
  bio: typeof siteData.bio;
  projects: typeof siteData.projects;
};

export default function Admin() {
  const { content, updateContent } = useContent();
  const [edits, setEdits] = useState<ContentEdits>({ bio: content.bio, projects: content.projects });

  const handleUpdate = async () => {
    try {
      await updateContent({
        ...content,  // Include all existing content
        bio: edits.bio,
        projects: edits.projects,
      } as const);
      alert('Content updated! Refresh other pages to see changes.');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error updating content: ${error.message}`);
      } else {
        alert('An unknown error occurred while updating content.');
      }
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'portfolio-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center">Content Editor</h1>
        
        {/* Bio Editor */}
        <div className="space-y-4">
          <label htmlFor="bio-editor" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <Textarea
            id="bio-editor"
            value={edits.bio}
            onChange={(e) => setEdits({ ...edits, bio: e.target.value })}
            rows={3}
            placeholder="Update your bio..."
          />
        </div>

        {/* Projects Editor */}
        <div className="space-y-4">
          <label htmlFor="projects-editor" className="block text-sm font-medium text-gray-700">
            Projects (JSON)
          </label>
          <Textarea
            id="projects-editor"
            value={JSON.stringify(edits.projects, null, 2)}
            onChange={(e) => setEdits({ ...edits, projects: JSON.parse(e.target.value) })}
            rows={10}
            placeholder='[{ "title": "New Project", "description": "...", "image": "/new.jpg", "tags": ["UI"], "link": "#" }]'
          />
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleUpdate}>Update Content</Button>
          <Button variant="outline" onClick={handleExport}>Export JSON</Button>
        </div>

        <pre className="bg-muted p-4 rounded text-sm overflow-auto">
          Current: {JSON.stringify(content.projects, null, 2)}
        </pre>
      </div>
    </section>
  );
}