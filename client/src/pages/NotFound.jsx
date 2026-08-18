import PageTransition from '../components/layout/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="section flex min-h-[70vh] flex-col items-center justify-center pt-36 text-center">
        <p className="font-display text-8xl text-sage-300">404</p>
        <h1 className="mt-4 text-3xl font-light md:text-4xl">This path has drifted away</h1>
        <p className="mx-auto mt-3 max-w-md text-sage-700">
          The page you're looking for isn't here — but calm always is. Let's guide you back.
        </p>
        <div className="mt-8">
          <Button to="/">Return Home</Button>
        </div>
      </section>
    </PageTransition>
  );
}
