import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Therapist from '../models/Therapist.js';
import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

const services = [
  {
    name: 'Deep Tissue Massage',
    slug: 'deep-tissue-massage',
    category: 'massage',
    description: 'Release the tension you have carried too long with firm, focused pressure.',
    benefits: ['Relieves chronic tension', 'Improves circulation', 'Reduces stress'],
    duration: 60, price: 95, isFeatured: true, image: '/images/deep-tissue.jpg',
  },
  {
    name: 'Radiance Facial',
    slug: 'radiance-facial',
    category: 'facial',
    description: "Wake up your skin's natural glow with a nourishing, brightening ritual.",
    benefits: ['Brightens complexion', 'Deep hydration', 'Gentle exfoliation'],
    duration: 50, price: 85, isFeatured: true, image: '/images/facial.jpg',
  },
  {
    name: 'Hot Stone Ritual',
    slug: 'hot-stone-ritual',
    category: 'body',
    description: 'Warmth that melts stress from the inside out with smooth basalt stones.',
    benefits: ['Deep muscle relaxation', 'Eases stiffness', 'Calms the mind'],
    duration: 75, price: 120, isFeatured: true, image: '/images/hot-stone.jpg',
  },
  {
    name: 'Hydrotherapy Soak',
    slug: 'hydrotherapy-soak',
    category: 'hydrotherapy',
    description: 'Float away in a mineral-rich, warm-water calm that soothes body and mind.',
    benefits: ['Detoxifies', 'Relieves aches', 'Restores calm'],
    duration: 45, price: 70, isFeatured: false, image: '/images/steam-room.jpg',
  },
  {
    name: 'Aromatherapy Massage',
    slug: 'aromatherapy-massage',
    category: 'massage',
    description: 'Essential oils and gentle strokes guide you into deep, fragrant relaxation.',
    benefits: ['Eases anxiety', 'Improves sleep', 'Balances mood'],
    duration: 60, price: 90, isFeatured: false, image: '/images/massage-oil.jpg',
  },
  {
    name: 'Serenity Signature Package',
    slug: 'serenity-signature-package',
    category: 'package',
    description: 'A half-day journey: massage, facial, and hydrotherapy in one seamless ritual.',
    benefits: ['Full-body renewal', 'Best value', 'Includes herbal lunch'],
    duration: 180, price: 260, isFeatured: true, image: '/images/pool.jpg',
  },
];

const testimonials = [
  { guestName: 'Amara S.', rating: 5, quote: 'The most relaxed I have felt in years. I walked out feeling brand new.', service: 'Hot Stone Ritual', isApproved: true, isFeatured: true },
  { guestName: 'Liam R.', rating: 5, quote: 'Booking was effortless and the therapists are true experts. My new sanctuary.', service: 'Deep Tissue Massage', isApproved: true, isFeatured: true },
  { guestName: 'Priya N.', rating: 5, quote: 'My skin has never looked better. Calm, clean, and utterly luxurious.', service: 'Radiance Facial', isApproved: true, isFeatured: true },
  { guestName: 'Marcus T.', rating: 5, quote: 'From the tea in the lounge to the final breath, everything felt intentional.', service: 'Serenity Signature Package', isApproved: true, isFeatured: true },
];

const therapists = [
  { name: 'Elena Rossi', slug: 'elena-rossi', bio: 'A decade of deep-tissue and sports massage mastery.', specialties: ['Deep Tissue', 'Sports Recovery'], yearsExperience: 10, photo: '/images/therapist-1.jpg' },
  { name: 'Kofi Mensah', slug: 'kofi-mensah', bio: 'Aromatherapy specialist with a gift for total-body calm.', specialties: ['Aromatherapy', 'Hot Stone'], yearsExperience: 8, photo: '/images/therapist-2.jpg' },
  { name: 'Sana Ali', slug: 'sana-ali', bio: 'Advanced esthetician focused on radiant, healthy skin.', specialties: ['Facials', 'Skincare'], yearsExperience: 7, photo: '/images/therapist-3.jpg' },
  { name: 'Yuki Tanaka', slug: 'yuki-tanaka', bio: 'Hydrotherapy and holistic wellness guide.', specialties: ['Hydrotherapy', 'Reiki'], yearsExperience: 9, photo: '/images/therapist-4.jpg' },
];

const posts = [
  {
    title: 'The Quiet Power of a Weekly Reset',
    slug: 'quiet-power-weekly-reset',
    excerpt: 'Why carving out one calm hour a week changes everything about how you feel.',
    content: 'Rest is not a reward for finishing your work — it is part of the work of being well.\n\nWhen you give yourself a single, protected hour each week, your nervous system learns that calm is available. Over time, that hour becomes an anchor: something your body starts to look forward to and lean on.\n\nStart small. Book the same time each week. Silence your phone. Let the ritual — not the to-do list — lead.',
    category: 'Wellness', readTime: 4, coverImage: '/images/lounge.jpg',
  },
  {
    title: 'A Beginner\'s Guide to Aromatherapy',
    slug: 'beginners-guide-aromatherapy',
    excerpt: 'The essential oils we reach for most, and what each one quietly does for you.',
    content: 'Scent is the fastest route to emotion. A single breath of lavender can slow a racing mind before you have even named the feeling.\n\nLavender soothes. Eucalyptus clears. Bergamot lifts. Sandalwood grounds. At Serenity, we blend these to match not just your treatment, but your mood on the day.\n\nAsk your therapist for a scent consultation on your next visit.',
    category: 'Skincare', readTime: 5, coverImage: '/images/aromatherapy.jpg',
  },
  {
    title: 'How to Extend That Post-Spa Glow',
    slug: 'extend-post-spa-glow',
    excerpt: 'Simple, gentle habits that keep the calm going long after you leave.',
    content: 'The magic of a treatment does not have to end at the door.\n\nHydrate generously in the hours after. Keep the lighting low that evening. Skip the screens before bed. And breathe — slow, four-count breaths — whenever the day tightens back up.\n\nSmall rituals, repeated, are how a single afternoon becomes a way of living.',
    category: 'Wellness', readTime: 3, coverImage: '/images/facial-mask.jpg',
  },
];

const run = async () => {
  await connectDB();
  await Promise.all([
    Service.deleteMany(),
    Testimonial.deleteMany(),
    Therapist.deleteMany(),
    BlogPost.deleteMany(),
  ]);
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);
  await Therapist.insertMany(therapists);
  await BlogPost.insertMany(posts);

  // Idempotent admin account (does not wipe existing users)
  const adminEmail = 'admin@serenityspa.com';
  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({
      name: 'Spa Admin',
      email: adminEmail,
      passwordHash: await User.hashPassword('admin1234'),
      role: 'admin',
    });
    console.log('👤 Admin created → admin@serenityspa.com / admin1234');
  }

  console.log(
    `✅ Seeded ${services.length} services, ${testimonials.length} testimonials, ` +
      `${therapists.length} therapists, ${posts.length} blog posts`
  );
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
