import { FormAddPost } from './Form';
import { Posts } from './Posts';
import { usePosts } from './context';

export function Results() {
  const { posts } = usePosts();
  return <p>🚀 {posts.length} atomic posts found</p>;
}

export function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}
