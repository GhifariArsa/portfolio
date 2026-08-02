import BlogList from '@/components/BlogList';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  return <BlogList posts={getAllPosts()} />;
}
