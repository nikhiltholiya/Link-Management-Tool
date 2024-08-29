const routes = [
   {
      slug: "user_panel",
      title: "User Panel",
      role: "USER",
      pages: [
         {
            slug: "dashboard",
            icon: "Dashboard",
            name: "Dashboard",
            path: "/dashboard",
         },
         {
            slug: "bio_links",
            icon: "BioLink",
            name: "Bio Links",
            path: "/dashboard/bio-links",
         },
         {
            slug: "short_links",
            icon: "ShortLink",
            name: "Short Links",
            path: "/dashboard/short-links",
         },
         {
            slug: "projects",
            icon: "Projects",
            name: "Projects",
            path: "/dashboard/projects",
         },
         {
            slug: "qr_codes",
            icon: "QRcode",
            name: "QR Codes",
            path: "/dashboard/qrcodes",
         },
         {
            slug: "current_plan",
            icon: "Pricing",
            name: "Current Plan",
            path: "/dashboard/current-plan",
         },
         {
            slug: "settings",
            icon: "Setting",
            name: "Settings",
            path: "/dashboard/settings",
         },
         {
            slug: "log_out",
            icon: "LogOut",
            name: "Log Out",
            path: "/logout",
         },
      ],
   },
   {
      slug: "admin_panel",
      title: "Admin Panel",
      role: "SUPER-ADMIN",
      pages: [
         {
            slug: "users",
            icon: "Users",
            name: "Users",
            path: "/dashboard/admin/users",
         },
         {
            slug: "subscriptions",
            icon: "IdCard",
            name: "Subscriptions",
            path: "/dashboard/admin/subscriptions",
         },
         {
            slug: "pricing_plans",
            icon: "Calendar",
            name: "Pricing Plans",
            path: "/dashboard/admin/pricing-plans",
         },
         {
            slug: "testimonials",
            icon: "Chat",
            name: "Testimonials",
            path: "/dashboard/admin/testimonials",
         },
         {
            slug: "manage_themes",
            icon: "Palette",
            name: "Manage Themes",
            path: "/dashboard/admin/manage-themes",
         },
         {
            slug: "payments_setup",
            icon: "PaymentSettings",
            name: "Payments Setup",
            path: "/dashboard/admin/payments-setup",
         },
         {
            slug: "custom_page",
            icon: "Page",
            name: "Custom Page",
            path: "/dashboard/admin/custom-page",
         },
         {
            slug: "app_settings",
            icon: "Setting",
            name: "App Settings",
            path: "/dashboard/admin/app-settings",
         },
         {
            slug: "translation",
            icon: "Globe",
            name: "Translation",
            path: "/dashboard/admin/translation",
         },
         {
            slug: "app_control",
            icon: "Control",
            name: "App Control",
            path: "/dashboard/admin/app-control",
         },
      ],
   },
];

export default routes;
