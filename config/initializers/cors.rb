Rails.application.config.middleware.insert_before 0, Rack::Cors do

  # So maybe we don't really need this because our FE and BE are on the same server
  allow do
    origins "http://localhost:3000"
    resource "*",
      headers: :any,
      methods: %i(get post put patch delete options head),
      credentials: true
  end

  # allow do
  #   origins "https://my.custom.domain.heroku.com"
  #   resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  # end
end

# https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication
# While on the topic of origins, by default Rails 5 now checks a request’s Origin header as 
#   an additional defense against CSRF attacks. Since our web app origin will always be 
#   different than the API origin, the check will fail. To disable the check, I added the 
#   following line to cors.rb:
# Rails.application.config.action_controller.forgery_protection_origin_check = false
