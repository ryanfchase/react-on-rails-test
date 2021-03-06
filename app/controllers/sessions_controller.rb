class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id
      render json: { status: :created, logged_in: true, user: user }
      # logged_in: true is a custom tag
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_user
      render json: { logged_in: true, user: @current_user }
    else
      render json: { logged_in: false } # no HTTP status... just say if they're logged in
    end
  end

  def logout
    old_user = @current_user if @current_user

    reset_session
    render json: { status: 200, logged_out: true, user: old_user }
  end
end
