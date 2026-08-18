import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { getPosts } from '../lib/api.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts).catch(() => {});
  }, []);

  const [featured, ...rest] = posts;

  return (
    <PageTransition>
      <section className="section pt-36">
        <Reveal className="text-center">
          <p className="eyebrow">Journal</p>
          <h1 className="mt-3 text-4xl font-light md:text-6xl">Notes on living well</h1>
        </Reveal>

        {posts.length === 0 && (
          <p className="mt-12 text-center text-sage-500">
            Run the seed script to load journal entries.
          </p>
        )}

        {/* Featured */}
        {featured && (
          <Reveal className="mt-14">
            <Link to={`/blog/${featured.slug}`} className="group grid gap-8 md:grid-cols-2">
              <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br from-sage-300 to-sage-500 text-6xl shadow-soft">
                🌿
              </div>
              <div className="flex flex-col justify-center">
                <span className="eyebrow">{featured.category} · {featured.readTime} min read</span>
                <h2 className="mt-3 text-3xl font-normal transition group-hover:text-sage-500 md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sage-700">{featured.excerpt}</p>
                <span className="mt-6 text-sm text-sand-500">Read the story →</span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p._id} i={i % 3}>
              <motion.div whileHover={{ y: -6 }} className="h-full">
                <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col">
                  <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br from-sand-300 to-clay-400 text-5xl shadow-soft">
                    ✨
                  </div>
                  <span className="eyebrow mt-4">{p.category} · {p.readTime} min</span>
                  <h3 className="mt-2 text-xl font-normal transition group-hover:text-sage-500">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-sage-700">{p.excerpt}</p>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
