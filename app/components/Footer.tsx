'use client';

import { siteData } from '@/app/data';
import { useContent } from '@/app/context/ContentContext';

export default function Footer() {
  const { content } = useContent(); // From context

  return (
    <footer className="glass py-8 mt-20">
      <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; 2025 {siteData.name}. All rights reserved.</p>
        <p className="mt-2">Email: {content.contact.email}</p>
      </div>
    </footer>
  );
}