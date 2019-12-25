if Rails.env == "production"
  Rails.application.config.session_store :cookie_store,
   key: "_authentication_app",
   domain: "my.custom.name.heroku.com",
   secure: true
else
  Rails.application.config.session_store :cookie_store,
    key: "_authentication_app",
    expire_after: 14.days
end

# This cookie-based session store is the Rails default. It is dramatically faster than the alternatives.
# Sessions typically contain at most a user_id and flash message; both fit within the 4K cookie size limit. A CookieOverflow exception is raised if you attempt to store more than 4K of data.
# The cookie jar used for storage is automatically configured to be the best possible option given your application's configuration.
# If you only have secret_token set, your cookies will be signed, but not encrypted. This means a user cannot alter their user_id without knowing your app's secret key, but can easily read their user_id. This was the default for Rails 3 apps.
# Your cookies will be encrypted using your apps secret_key_base. This goes a step further than signed cookies in that encrypted cookies cannot be altered or read by users. This is the default starting in Rails 4.