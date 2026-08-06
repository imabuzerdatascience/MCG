# Editable Content Plan

This document records the content that the admin dashboard must manage. The current website remains backed by the files in `data/` until the MongoDB connection is implemented.

## Temporary admin credential

For local development only:

- Email: `admin@mgc.local`
- Password: `MGCAdmin@2026`
- Login page: `/admin/login`
- Dashboard: `/admin`

This credential is hardcoded temporarily in `lib/admin-auth.ts`. It must be replaced with a secure production authentication flow before deployment.

## Editable areas

### 1. Contact information below the navbar

Admin can edit:

- Location/city
- Email address
- Primary phone number
- Secondary phone number
- Visibility of each contact item

Current component: `components/layout/TopBar.tsx`

### 2. News and business insights

Admin can:

- Add a news or insight article
- Edit an article
- Delete an article
- Publish/unpublish an article
- Set the headline, slug, category, date, short description, and full content
- Upload or replace the article image through Cloudinary
- Select the articles shown as featured/latest

The hero card heading has been changed to `Latest Update`. It will show the latest published content after MongoDB is connected.

Current components/data: `components/home/HeroSection.tsx`, `components/home/NewsInsights.tsx`, `data/news.ts`

### 3. Leadership

Admin can:

- Add a leadership member
- Edit a member
- Remove a member
- Set the member name, position, qualification, biography/experience, display order, and visibility
- Upload or replace the member profile image through Cloudinary
- Select the member featured on the home page

Current components/data: `components/home/LeadershipFeature.tsx`, `data/team.ts`

### 4. Clients

Admin can:

- Add a client
- Edit a client
- Remove a client
- Set the client name, logo/image, website URL, display order, and visibility
- Upload or replace the client logo through Cloudinary

Current components/data: `components/home/ClientsCarousel.tsx`, `data/clients.ts`

### 5. Footer contact details

Admin can edit:

- Office address
- Phone numbers
- Contact email
- Company description shown in the footer
- Contact item visibility

Current component: `components/layout/Footer.tsx`

## MongoDB and Cloudinary migration plan

When the database is connected, the current static data must be seeded into MongoDB rather than discarded. The planned collections are:

- `siteSettings`: top-bar contact information and footer contact information
- `news`: news and insight articles, including Cloudinary image URLs and publication state
- `leadership`: leadership members, including Cloudinary profile image URLs
- `clients`: client records, including Cloudinary logo URLs

Each collection should include `createdAt` and `updatedAt`. Editable records should also include `sortOrder` and `isPublished`/`isVisible` where applicable.

The migration should:

1. Read the existing records from `data/news.ts`, `data/team.ts`, and `data/clients.ts`.
2. Create the initial `siteSettings` document from the current values in `TopBar.tsx` and `Footer.tsx`.
3. Insert the current records into MongoDB without losing their existing IDs, slugs, or display order.
4. Keep image URLs compatible with Cloudinary so future replacements use Cloudinary-hosted assets.
5. Update the public components to read published/visible records from MongoDB.
6. Keep a safe fallback to the static data until the first successful database configuration.

The admin dashboard will then provide forms for these records and use the protected Cloudinary signature endpoint for image uploads.
