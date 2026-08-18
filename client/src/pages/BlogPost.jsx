import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { getPost } from '../lib/api.js';

export default function BlogPost() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setData(null);
    setNotFound(false);
    getPost(slug)
      .then(setData)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <PageTransition>
        <section className="section pt-40 text-center">
          <h1 className="text-3xl font-light">Story not found</h1>
          <div className="mt-6"><Button to="/blog">Back to Journal</Button></div>
        </section>
      </PageTransition>
    );
  }

  if (!data) {
    return (
      <section className="section pt-40 text-center text-sage-500">Loading…</section>
    );
  }

  const { post, related } = data;

  return (
    <PageTransition>
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-sand-500"
      />

      <article className="section max-w-3xl pt-36">
        <Reveal>
          <Link to="/blog" className="text-sm text-sage-500 hover:text-sand-500">← Journal</Link>
          <p className="eyebrow mt-6">{post.category} · {post.readTime} min read</p>
          <h1 className="mt-3 text-4xl font-light leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-sage-500">
            By {post.author} · {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </Reveal>

        <Reveal i={1}>
          <div className="mt-8 flex aspect-[16/9] items-center justify-center rounded-2xl bg-gradient-to-br from-sage-300 to-sage-500 text-7xl shadow-soft">
            🌿
          </div>
        </Reveal>

        <Reveal i={2}>
          <div className="prose-serenity mt-10 space-y-5 text-lg leading-relaxed text-sage-900">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>
      </article>

      {/* Related */}
      {related?.length > 0 && (
        <section className="section max-w-5xl pt-0">
          <h2 className="mb-8 text-center text-2xl font-light">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p._id} i={i % 3}>
                <Link to={`/blog/${p.slug}`} className="group block rounded-2xl bg-white/70 p-6 shadow-soft">
                  <span className="eyebrow">{p.readTime} min</span>
                  <h3 className="mt-2 text-lg font-normal transition group-hover:text-sage-500">{p.title}</h3>
                  <p className="mt-2 text-sm text-sage-700">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
}
