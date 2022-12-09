import MainLayout from '@/components/MainLayout';
import { getAllBlogList } from '@/services/blog';
import React, { useEffect, useState } from 'react';
import Article from './components/Article';

/** blog 首页 */
export default function Blog() {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { result } = await getAllBlogList();
        setBlogList(result);
      } catch (error) {
        // pass
      }
    })();
  }, []);

  return (
    <MainLayout title="MainLayout">
      <div>
        {blogList.map((blog) => {
          return <Article key={blog.id} />;
        })}
      </div>
    </MainLayout>
  );
}
