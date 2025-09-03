// src/blogRoutes.ts
import express from 'express';
import Blog from './models/Blog';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';

export function registerBlogRoutes(app: express.Express) {
    // List of public blogs
    app.get('/blogs', async (req, res, next) => {

        try {
            const blogs = await Blog.find({ visibility: 'public' })
                .sort({ createdAt: -1 })
                .select('title slug authorName createdAt')
                .lean();
            return res.render('pages/blogsIndex', { title: 'Blogs', blogs });
        } catch (err) { next(err); }
    });

    // Dynamic blog - slug
    app.get('/blogs/:slug', async (req, res, next) => {
        try {
            const slug = req.params.slug;
            const blog = await Blog.findOne({ slug }).lean();
            if (!blog) return res.status(404).render('pages/404', { title: 'Not found' });

            // If the blog stored markdown, convert -> HTML and sanitize (do it at render time)
            const rawHtml = blog.html ?? await marked(blog.markdown || '');
            const safeHtml = sanitizeHtml(rawHtml, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                allowedAttributes: {
                    a: ['href', 'name', 'target', 'rel'],
                    img: ['src', 'alt', 'title', 'width', 'height'],
                },
                allowedSchemes: ['http', 'https', 'mailto', 'data']
            });

            // Pass blog + rendered safe HTML
            return res.render('pages/blog', { title: blog.title, blog, htmlContent: safeHtml });
        } catch (err) { next(err); }
    });

    // Example: protected route to create a blog (replace with your auth check)
    app.post('/blogs', express.urlencoded({ extended: true }), async (req, res, next) => {
        try {
            const user = (req as any).user;
            if (!user) return res.status(401).send('Unauthorized');

            const { title, markdown } = req.body;
            if (!title || !markdown) return res.status(400).send('Missing fields');

            const slug = slugify(title, { lower: true, strict: true });

            // ensure uniqueness — if exists, append timestamp
            let finalSlug = slug;
            const exists = await Blog.findOne({ slug: finalSlug });
            if (exists) finalSlug = `${slug}-${Date.now()}`;

            const blog = await Blog.create({
                title,
                slug: finalSlug,
                markdown,
                authorId: user._id ? String(user._id) : undefined,
                authorName: user.username || user.name || 'Unknown',
            });

            // Optionally render right away:
            res.redirect(`/blogs/${blog.slug}`);
        } catch (err) { next(err); }
    });
}
