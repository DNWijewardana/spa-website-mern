import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';

const services = [
  {
    name: 'Deep Tissue Massage',
    slug: 'deep-tissue-massage',
    category: 'massage',
    description: 'Release the tension you have carried too long with firm, focused pressure.',
    benefits: ['Relieves chronic tension', 'Improves circulation', 'Reduces stress'],
    duration: 60,
    price: 95,
    isFeatured: true,
    image: '/images/deep-tissue.jpg',
  },
  {
    name: 'Radiance Facial',
    slug: 'radiance-facial',
    category: 'facial',
    description: "Wake up your skin's natural glow with a nourishing, brightening ritual.",
    benefits: ['Brightens complexion', 'Deep hydration', 'Gentle exfoliation'],
    duration: 50,
    price: 85,
    isFeatured: true,
    image: '/images/radiance-facial.jpg',
  },
  {
    name: 'Hot Stone Ritual',
    slug: 'hot-stone-ritual',
    category: 'body',
    description: 'Warmth that melts stress from the inside out with smooth basalt stones.',
    benefits: ['Deep muscle relaxation', 'Eases stiffness', 'Calms the mind'],
    duration: 75,
    price: 120,
    isFeatured: true,
    image: '/images/hot-stone.jpg',
  },
  {
    name: 'Hydrotherapy Soak',
    slug: 'hydrotherapy-soak',
    category: 'hydrotherapy',
    description: 'Float away in a mineral-rich, warm-water calm that soothes body and mind.',
    benefits: ['Detoxifies', 'Relieves aches', 'Restores calm'],
    duration: 45,
    price: 70,
    isFeatured: false,
    image: '/images/hydrotherapy.jpg',
  },
];

const testimonials = [
  {
    guestName: 'Amara S.',
    rating: 5,
    quote: 'The most relaxed I have felt in years. I walked out feeling brand new.',
    service: 'Hot Stone Ritual',
    isApproved: true,
    isFeatured: true,
  },
  {
    guestName: 'Liam R.',
    rating: 5,
    quote: 'Booking was effortless and the therapists are true experts. My new sanctuary.',
    service: 'Deep Tissue Massage',
    isApproved: true,
    isFeatured: true,
  },
  {
    guestName: 'Priya N.',
    rating: 5,
    quote: 'My skin has never looked better. Calm, clean, and utterly luxurious.',
    service: 'Radiance Facial',
    isApproved: true,
    isFeatured: true,
  },
];

const run = async () => {
  await connectDB();
  await Service.deleteMany();
  await Testimonial.deleteMany();
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);
  console.log(`✅ Seeded ${services.length} services and ${testimonials.length} testimonials`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
