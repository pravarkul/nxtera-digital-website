# WordPress Integration Guide for Nxtera Digital

This guide will help you properly set up WordPress to work with your Next.js site.

## 1. Fix the 401 Unauthorized Error

The 401 error means WordPress is requiring authentication for the REST API. Here's how to fix it:

### Option 1: Install and Configure JWT Authentication Plugin

1. Install the "JWT Authentication for WP REST API" plugin
2. Add these lines to your `.htaccess` file:

\`\`\`
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
\`\`\`

3. Add these lines to your `wp-config.php` file:

\`\`\`php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key');
define('JWT_AUTH_CORS_ENABLE', true);
\`\`\`

### Option 2: Make REST API Public (Easier)

Add this code to your theme's `functions.php` file:

\`\`\`php
// Make REST API public
function make_rest_api_public() {
    // Remove filters that require authentication
    remove_filter('rest_authentication_errors', 'rest_authentication_errors');
    
    // Allow public access to REST API
    add_filter('rest_authentication_errors', function($result) {
        // If the request is already authenticated, do nothing
        if (true === $result || is_wp_error($result)) {
            return $result;
        }
        
        // No authentication has been performed yet, return null to continue
        return null;
    });
}
add_action('init', 'make_rest_api_public');

// Enable CORS
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');
\`\`\`

## 2. Create Custom Post Types

### Option 1: Using Custom Post Type UI Plugin

1. Install and activate "Custom Post Type UI" plugin
2. Go to CPT UI > Add/Edit Post Types
3. Create "Services" post type:
   - Post Type Slug: services
   - Plural Label: Services
   - Singular Label: Service
   - Check "Show in REST API"
   - REST API base slug: services
   - Check "Title", "Editor", "Featured Image" under "Supports"

4. Create "Testimonials" post type:
   - Post Type Slug: testimonials
   - Plural Label: Testimonials
   - Singular Label: Testimonial
   - Check "Show in REST API"
   - REST API base slug: testimonials
   - Check "Title", "Editor" under "Supports"

### Option 2: Using Code

Add this to your theme's `functions.php`:

\`\`\`php
// Register Custom Post Types
function register_custom_post_types() {
    // Services
    register_post_type('services', array(
        'labels' => array(
            'name' => 'Services',
            'singular_name' => 'Service'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
        'rest_base' => 'services',
    ));
    
    // Testimonials
    register_post_type('testimonials', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
        'rest_base' => 'testimonials',
    ));
}
add_action('init', 'register_custom_post_types');
\`\`\`

## 3. Add Custom Fields (Optional)

1. Install and activate "Advanced Custom Fields" plugin
2. Go to Custom Fields > Add New
3. Create a field group for Services:
   - Field Group Title: Service Fields
   - Add Field: Icon (Text field)
   - Location: Post Type is equal to Service
   - Show in REST API: Yes

4. Create a field group for Testimonials:
   - Field Group Title: Testimonial Fields
   - Add Field: Position (Text field)
   - Add Field: Avatar (Image field)
   - Location: Post Type is equal to Testimonial
   - Show in REST API: Yes

## 4. Add Sample Content

1. Add at least one Service
2. Add at least one Testimonial
3. Add at least one Blog Post

## 5. Test the REST API

Visit these URLs in your browser to check if they work:

1. `https://nxteradigital.com/wp/wp-json/wp/v2/posts`
2. `https://nxteradigital.com/wp/wp-json/wp/v2/services`
3. `https://nxteradigital.com/wp/wp-json/wp/v2/testimonials`

If you see JSON data, your REST API is working correctly!

## Need More Help?

If you're still having issues, please contact your WordPress administrator or developer for assistance.
