export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: 'Systems' | 'Databases' | 'Career' | 'Research' | 'Books' | 'Python' | 'Algorithms';
  readTime: number;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "How Writes Work in Apache Cassandra",
    slug: "cassandra-writes",
    date: "Oct 20, 2025",
    category: "Databases",
    readTime: 12,
    excerpt: "Deep dive into memtables, SSTables, compaction, and write path optimization."
  },
  // ... (rest of the blog posts array)
];
