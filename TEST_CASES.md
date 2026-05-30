# Test Cases - AI Product Recommendation App

## Automated Execution Results

| ID | Area | Test Case | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | Backend | `GET /api/health` | API responds with `status: OK` | PASS |
| TC-02 | Auth | `POST /api/auth/login` with default user | Login succeeds and returns token | PASS |
| TC-03 | Auth | `POST /api/auth/login` with admin user | Login succeeds and returns token | PASS |
| TC-04 | Auth | Register new user, then login with uppercase email | Case-insensitive login works | PASS |
| TC-05 | Auth (Social) | `POST /api/auth/social` with `google` | Login succeeds and returns user + token | PASS |
| TC-06 | Auth (Social) | `POST /api/auth/social` with `facebook` | Login succeeds and returns user + token | PASS |
| TC-07 | Auth (Social) | `POST /api/auth/social` with `instagram` | Login succeeds and returns user + token | PASS |
| TC-08 | Auth (Validation) | `POST /api/auth/social` with invalid provider | API returns `400` | PASS |
| TC-09 | Products | `GET /api/products` | Product list returns successfully | PASS |
| TC-10 | Products | `GET /api/products?search=laptop` | Filtered products return successfully | PASS |
| TC-11 | Recommendation | `GET /api/recommendations/u1?limit=5` | Returns 5 recommendations | PASS |
| TC-12 | Recommendation | `GET /api/recommendations/popular/all?limit=4` | Returns 4 popular products | PASS |
| TC-13 | Ratings | `POST /api/ratings` valid payload | Rating is saved | PASS |
| TC-14 | Interactions | `POST /api/products/p2/interactions` | Interaction logged successfully | PASS |
| TC-15 | Interactions | `POST /api/products/unknown/interactions` | API returns `404` | PASS |
| TC-16 | Admin Auth | `GET /api/admin/stats` without token | API returns `401` | PASS |
| TC-17 | Admin Auth | `GET /api/admin/stats` with non-admin token | API returns `403` | PASS |
| TC-18 | Admin | `GET /api/admin/stats` with admin token | Stats return successfully | PASS |
| TC-19 | CORS | Login request with Origin `http://127.0.0.1:5173` | `Access-Control-Allow-Origin` header present | PASS |
| TC-20 | Frontend Build | `npm run build --prefix frontend` | Build completes without errors | PASS |
| TC-21 | Backend Syntax | `node --check` on backend source files | No syntax errors | PASS |
| TC-22 | Combined Startup | Backend + frontend started together | Backend health `OK`, frontend returns HTTP `200` | PASS |

## Functional UI Test Cases (Manual)

| ID | Area | Test Case | Expected Result |
|---|---|---|---|
| TC-23 | Product Card | Product card shows name, description, brand, id, rating, stock, tags, and price | All fields visible on card |
| TC-24 | Wishlist | Click `Add Wishlist` on a product | Product appears in Wishlist section |
| TC-25 | Wishlist Toggle | Click `Wishlisted` again | Product is removed from Wishlist section |
| TC-26 | Wishlist Persistence | Refresh page after adding wishlist items | Wishlist remains for same user |
| TC-27 | Recommendations | `Recommended For You` section loads | Personalized recommendations appear |
| TC-28 | Today Section | `Today's Recommendations` section loads | Popular/trending products appear |
| TC-29 | Social Auth UI | Google/Facebook/Instagram buttons on login/register page | Buttons visible and clickable |
| TC-30 | Contact Us | Click `Contact Us` in navbar | Page scrolls to contact section |
| TC-31 | Contact Form | Submit valid contact form | Success alert appears |
