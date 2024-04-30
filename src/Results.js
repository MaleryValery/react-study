import { useContext } from 'react';
import { FormAddPost } from './Form';
import { Posts } from './Posts';
import PostContext from './context';

export function Results() {
  const { posts } = useContext(PostContext);
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
