# Step-by-Step WordPress Setup for Nxtera Digital

Follow these exact steps to fix the WordPress REST API and enable content management.

## Step 1: Fix WordPress REST API Authentication

### Option A: Add Code to functions.php (Recommended)

1. **Access your WordPress admin**: Go to `https://nxteradigital.com/wp/wp-admin`
2. **Navigate to**: Appearance → Theme Editor → functions.php
3. **Add this code at the end of the file**:

\`\`\`php
// Fix REST API Authentication Issues
function nxtera_fix_rest_api() {
    // Remove authentication requirement for public endpoints
    remove_filter('rest_authentication_errors', 'rest_authentication_errors');
    
    // Allow public access to REST API
    add_filter('rest_authentication_errors', function($result) {
        if (true === $result || is_wp_error($result)) {
            return $result;
        }
        return null;
    });
}
add_action('init', 'nxtera_fix_rest_api');

// Enable CORS for API requests
function nxtera_add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init', 'nxtera_add_cors_headers');

// Register Custom Post Types
function nxtera_register_custom_post_types() {
    // Services Post Type
    register_post_type('services', array(
        'labels' => array(
            'name' => 'Services',
            'singular_name' => 'Service',
            'add_new' => 'Add New Service',
            'add_new_item' => 'Add New Service',
            'edit_item' => 'Edit Service',
            'new_item' => 'New Service',
            'view_item' => 'View Service',
            'search_items' => 'Search Services',
            'not_found' => 'No services found',
            'not_found_in_trash' => 'No services found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
        'rest_base' => 'services',
        'menu_icon' => 'dashicons-admin-tools',
        'rewrite' => array('slug' => 'services'),
    ));
    
    // Testimonials Post Type
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial',
            'add_new' => 'Add New Testimonial',
            'add_new_item' => 'Add New Testimonial',
            'edit_item' => 'Edit Testimonial',
            'new_item' => 'New Testimonial',
            'view_item' => 'View Testimonial',
            'search_items' => 'Search Testimonials',
            'not_found' => 'No testimonials found',
            'not_found_in_trash' => 'No testimonials found in trash'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
        'rest_base' => 'testimonials',
        'menu_icon' => 'dashicons-format-quote',
        'rewrite' => array('slug' => 'testimonials'),
    ));
}
add_action('init', 'nxtera_register_custom_post_types');
\`\`\`

4. **Click "Update File"**

### Option B: Install Plugin (Alternative)

If you can't edit functions.php, install the "Disable REST API and Require JWT / OAuth Authentication" plugin and configure it to allow public access.

## Step 2: Update Permalinks

1. **Go to**: Settings → Permalinks
2. **Select**: "Post name" structure
3. **Click**: "Save Changes"

## Step 3: Test REST API Endpoints

Open these URLs in your browser to verify they work:

1. **WordPress API Root**: `https://nxteradigital.com/wp/wp-json/`
   - Should show JSON with API information

2. **Posts Endpoint**: `https://nxteradigital.com/wp/wp-json/wp/v2/posts`
   - Should show array of blog posts (empty array if no posts)

3. **Services Endpoint**: `https://nxteradigital.com/wp/wp-json/wp/v2/services`
   - Should show array of services (empty array if no services)

4. **Testimonials Endpoint**: `https://nxteradigital.com/wp/wp-json/wp/v2/testimonials`
   - Should show array of testimonials (empty array if no testimonials)

## Step 4: Create Service Content for Individual Pages

For each service, create a WordPress post in the "Services" section:

### Service 1: Website Optimization
- **Title**: Website Optimization
- **Slug**: website-optimization
- **Content**: [Your detailed content about website optimization]
- **Featured Image**: Upload an image
- **Status**: Published

### Service 2: Social Media Management
- **Title**: Social Media Management
- **Slug**: social-media-management
- **Content**: [Your detailed content about social media management]
- **Featured Image**: Upload an image
- **Status**: Published

### Continue for all 8 services...

## Step 5: Add Blog Posts

1. **Go to**: Posts → Add New
2. **Create sample blog posts**:
   - Title: "5 SEO Strategies for 2025"
   - Content: [Your blog content]
   - Featured Image: Upload an image
   - Status: Published

## Step 6: Add Testimonials

1. **Go to**: Testimonials → Add New
2. **Create testimonials**:
   - Title: [Client Name]
   - Content: [Testimonial quote]
   - Status: Published

## Step 7: Install Advanced Custom Fields (Optional)

For additional fields like position, avatar, etc.:

1. **Install**: Advanced Custom Fields plugin
2. **Create field groups** for testimonials with fields like:
   - Position (Text)
   - Avatar (Image)
3. **Enable REST API** for these fields

## Step 8: Test Your Website

1. **Visit your main page**: Services should show (hardcoded)
2. **Click "Learn More"**: Should show WordPress content
3. **Check blog section**: Should show WordPress posts
4. **Check testimonials**: Should show WordPress testimonials

## Troubleshooting

### If you still get 401 errors:

1. **Check if you have security plugins** (Wordfence, etc.) that might be blocking REST API
2. **Temporarily deactivate all plugins** except essential ones
3. **Contact your hosting provider** - some hosts block REST API by default

### If custom post types don't appear:

1. **Make sure the code was added correctly** to functions.php
2. **Check for PHP errors** in WordPress
3. **Try refreshing permalinks** (Step 2)

### If content doesn't update:

1. **Clear any caching** (if you have caching plugins)
2. **Check browser console** for errors
3. **Verify the REST API URLs** work in browser

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check WordPress error logs
3. Test the REST API URLs directly
4. Contact your WordPress developer or hosting provider

Once these steps are complete, your website will:
- Show hardcoded services on the main page
- Load service details from WordPress when clicking "Learn More"
- Display blog posts from WordPress
- Show testimonials from WordPress
