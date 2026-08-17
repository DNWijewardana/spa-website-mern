import Service from '../models/Service.js';

// GET /api/services  (?category=&featured=true)
export const getServices = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured === 'true') filter.isFeatured = true;
    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// GET /api/services/:slug
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json(service);
  } catch (err) {
    next(err);
  }
};

// POST /api/services  (admin)
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/services/:id  (admin)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json(service);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/services/:id  (admin) — soft delete
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }
    res.json({ message: 'Service archived' });
  } catch (err) {
    next(err);
  }
};
