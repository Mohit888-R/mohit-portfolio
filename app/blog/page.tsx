'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, Tag, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { blogPosts } from '@/app/data/blogPosts';

interface Blog {
  title: string;
  slug: string;
  date: string; // "Oct 20, 2025"
  category: string;
  readTime: number; // minutes
  excerpt: string;
}

const rawBlogs: Blog[] = [
  { title: "How Writes Work in Apache Cassandra", slug: "cassandra-writes", date: "Oct 20, 2025", category: "Distributed Systems", readTime: 12, excerpt: "Deep dive into memtables, SSTables, and compaction strategies." },
  { title: "Redis Replication Internals", slug: "redis-replication", date: "Oct 17, 2025", category: "Databases", readTime: 10, excerpt: "How Redis achieves high availability with master-replica sync." },
  { title: "How to Handle Arrogant Colleagues at Work", slug: "arrogant-people-at-work", date: "Oct 05, 2025", category: "Career", readTime: 8, excerpt: "Practical strategies to stay calm and professional." },
  // Add all 100+ from your list — I'll auto-parse below
];

export default function Blogs() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  // Auto-parse your list (you can replace with API later)
  const blogs: Blog[] = useMemo(() => {
    const parsed = blogPosts;
    const list: Blog[] = [];
    parsed.forEach((post) => {
      const dateSpan = post.date;
      const link = post.slug;
      if (dateSpan && link) {
        const date = dateSpan;
        const title = link;
        const slug = link;
        const category = title.includes('Paper Notes') ? 'Research' :
                        title.includes('Book Notes') ? 'Books' :
                        title.includes('Interview') ? 'Career' :
                        ['Cassandra', 'Redis', 'gRPC', 'CDN', 'Consensus', 'Deadlock', 'Cache', 'DNS'].some(k => title.includes(k)) ? 'Systems' : 'Career';
        list.push({
          title,
          slug,
          date,
          category,
          readTime: Math.floor(Math.random() * 8) + 5,
          excerpt: `${title.split(' - ')[0]}...`
        });
      }
    });
    return list.reverse(); // newest first
  }, []);

  // Filters
  const filtered = useMemo(() => {
    return blogs.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || b.category === selectedCategory)
    );
  }, [blogs, search, selectedCategory]);

  const categories = [...new Set(blogs.map(b => b.category))];
  const visibleBlogs = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="py-20 px-4" id="blogs">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Tag className="w-3 h-3 mr-1" />
            {blogs.length} Posts
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Engineering Chronicles
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep dives into systems, leadership, and the art of building things that last.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/80 backdrop-blur"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              <Filter className="w-4 h-4 mr-1" />
              All
            </Button>
            {categories.map(cat => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence>
            {visibleBlogs.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-16">
            <Button
              size="lg"
              onClick={() => setVisibleCount(c => c + 9)}
              className="group"
            >
              Load More
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No posts found.</p>
            <Button variant="ghost" onClick={() => { setSearch(''); setSelectedCategory(null); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// Reusable 3D Blog Card
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -12,
        rotateX: 8,
        rotateY: -8,
        z: 50,
      }}
      className="group relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className="overflow-hidden rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 p-1 shadow-xl h-full">
        <div className="relative bg-background/90 rounded-[22px] p-6 flex flex-col h-full">
          {/* Category Badge */}
          <Badge variant="secondary" className="w-fit mb-3">
            {blog.category}
          </Badge>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime} min
            </span>
          </div>

          {/* Read Button */}
          <div className="mt-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="w-full group/btn"
            >
              <a href={`/blogs/${blog.slug}`}>
                Read Post
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition" />
              </a>
            </Button>
          </div>

          {/* Shine */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Card>
    </motion.div>
  );
}