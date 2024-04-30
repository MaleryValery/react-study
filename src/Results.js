import { FormAddPost } from './Form';
import { Posts } from './Posts';

export function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

export function Main({ posts, onAddPost }) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}
