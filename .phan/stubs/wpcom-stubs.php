<?php
/**
 * Stubs automatically generated from WordPress.com commit db0627da188587d19c9bb2745df76df28eda7500.
 *
 * Do not edit this directly! Update the definition file in the wpcom repo
 * at `bin/teamcity-builds/jetpack-stubs/stub-defs.php` and regenerate the
 * stubs from there.
 */

namespace {
    function is_automattician($user_id = \false)
    {
    }
    class Store_Product_List
    {
        /**
         * @param int $blog_id
         * @return array
         */
        public static function get_site_specific_features_data($blog_id = 0)
        {
        }
        public static function api_only_get_active_plans_v1_4($blog_id = \false, $coupon_code = \null, $use_query_param_data = \false)
        {
        }
    }
    class Memberships_Product
    {
        const KEEP_SUBSCRIPTIONS = 'KEEP_SUBSCRIPTIONS';
        const CANCEL_SUBSCRIPTIONS = 'CANCEL_SUBSCRIPTIONS';
        static function create($_blog_id, array $data)
        {
        }
        public static function generate_default_products($_blog_id, $type, $currency, $is_editable = \null)
        {
        }
        /**
         * @param int $_blog_id
         * @param int $post_id
         * @param bool $allow_deleted
         * @return Memberships_Product|WP_Error|null
         */
        public static function get_from_post($_blog_id, $post_id, $allow_deleted = \false)
        {
        }
        /**
         * @param $_blog_id
         * @return WP_Error|WP_Post[]|stdClass[]
         */
        public static function get_plans_posts_list($_blog_id)
        {
        }
        /**
         * @param int $_blog_id
         * @param string $type
         * @param bool|null $is_editable
         * @param bool $retrieve_deleted
         * @return array|WP_Error
         */
        public static function get_product_list($_blog_id, $type = \null, ?bool $is_editable = \null, $retrieve_deleted = \false)
        {
        }
    }
    function wpcom_is_nav_redesign_enabled($blog_id = \null)
    {
    }
    /**
     * @param int $blog_id
     * @return bool
     */
    function blaze_is_site_eligible($blog_id)
    {
    }
    class Jetpack_Sync_WPCOM_Shadow_Replicastore extends \Automattic\Jetpack\Sync\Replicastore
    {
        /**
         * @param int $user_id
         * @return \WP_User
         */
        public function get_user($external_user_id)
        {
        }
        /**
         * @throws \Exception
         * @param int $user_id
         */
        public function delete_user($external_user_id)
        {
        }
    }
    class WPCOM_Features
    {
        public const LEGACY_CONTACT = 'legacy-contact';
        public const LOCKED_MODE = 'locked-mode';
        public const SUBSCRIPTION_GIFTING = 'subscription-gifting';
    }
    class Jetpack_Fonts_Typekit
    {
        public static function maybe_override_for_advanced_mode($wp_customize)
        {
        }
    }
    class GP_Locales
    {
        public static function by_field($field_name, $field_value)
        {
        }
    }
}
namespace WPCOM\Jetpack_AI\Usage {
    class Helper
    {
        /**
         * @param int $blog_id
         * @param \DateTime|null $usage_period_start_date
         * @return int
         */
        public static function get_current_period_requests_count($blog_id, ?\DateTime $usage_period_start_date = null)
        {
        }
        /**
         * @param int $blog_id
         * @return int
         */
        public static function get_all_time_requests_count($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return String
         */
        public static function get_usage_period_start_date($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return String
         */
        public static function get_usage_next_period_start_date($blog_id)
        {
        }
        /**
         * @param string|null $most_recent_renew_date
         * @return \Period_Metered_Usage
         */
        public static function get_usage_period_for_date($most_recent_renew_date)
        {
        }
        /**
         * @param int $blog_id
         * @return BD_Ownership|null
         */
        public static function get_purchase_data($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return array
         */
        public static function get_period_data($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return int
         */
        public static function get_tier_licensed_quantity($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return array
         */
        public static function get_current_tier($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return array|null
         */
        public static function get_next_tier($blog_id)
        {
        }
        public static function get_tier_plans_list()
        {
        }
        /**
         * @param int $blog_id
         * @return int
         */
        public static function get_free_requests_limit($blog_id)
        {
        }
        /**
         * @param int $blog_id
         * @return boolean
         */
        public static function is_over_limit($blog_id)
        {
        }
        public static function ai_tier_plans_enabled()
        {
        }
        /**
         * @param int $blog_id
         * @return boolean
         */
        public static function site_requires_upgrade($blog_id)
        {
        }
        public static function get_costs()
        {
        }
        /**
         * @param int $blog_id
         * @param int $count
         * @return void
         */
        public static function bump_usage(int $blog_id, int $count = 1): void
        {
        }
    }
}
